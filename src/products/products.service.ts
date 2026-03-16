import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({ where: { productId: id } });
    if (!product) throw new NotFoundException();
    return product;
  }

  async findByProvider(id: string) {
    const products = await this.productRepository.find({ where: { provider: id } });
    if (products.length === 0) throw new NotFoundException();
    return products;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto
    })
    if (!productToUpdate) throw new NotFoundException()
      this.productRepository.save(productToUpdate);
    return productToUpdate;
  }

  async remove(id: string) {
    this.findOne(id)
    return this.productRepository.delete({
      productId: id,
    })
    return {
      message: "Objeto con id ${id} eliminado"
    }
  }
}
