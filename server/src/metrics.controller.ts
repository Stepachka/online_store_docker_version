// server/src/metrics.controller.ts
import { Controller, Get, Res } from '@nestjs/common';
import express from 'express';
import * as client from 'prom-client';

@Controller()
export class MetricsController {
  constructor() {
    // Регистрация стандартных метрик Node.js
    client.collectDefaultMetrics();
  }

  @Get('metrics')
  async metrics(@Res() response: express.Response): Promise<void> {
    // Установка правильного Content-Type для Prometheus
    response.set('Content-Type', client.register.contentType);

    // Возвращение метрик в текстовом формате
    response.end(await client.register.metrics());
  }
}
