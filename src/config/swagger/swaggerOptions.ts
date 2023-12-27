import { DocumentBuilder, SwaggerDocumentOptions } from "@nestjs/swagger";
import { ExpressSwaggerCustomOptions } from "../interfaces/Swagger";

export const config = new DocumentBuilder()
    .setContact('Niconsm', 'https://niconsm.com.ar', 'nicolasmachicadomiranda@gmail.com')
    .setTitle('Addresses Wallet')
    .setDescription('A addresses wallet app.')
    .setVersion('1.0')
    .addTag('wallet')
    .build();

export const options: SwaggerDocumentOptions = {
    deepScanRoutes: false,
    ignoreGlobalPrefix: true
}

export const extraOptions: ExpressSwaggerCustomOptions = {
    customSiteTitle: 'Wallets Niconsm API Documentation',
}