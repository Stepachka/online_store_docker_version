// src/products/dto/create-product.dto.ts
import { IsString, IsNumber, IsPositive, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  img: string;

  @IsNumber()
  @IsPositive()
  cost: number;

  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds: number[];
}
