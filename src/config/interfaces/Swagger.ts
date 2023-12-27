import { OpenAPIObject } from "@nestjs/swagger";


export interface ExpressSwaggerCustomOptions {
    explorer?: boolean;
    swaggerOptions?: Record<string, any>;
    customCss?: string;
    customCssUrl?: string;
    customJs?: string;
    customfavIcon?: string;
    customSwaggerUiPath?: string;
    swaggerUrl?: string;
    customSiteTitle?: string;
    validatorUrl?: string;
    url?: string;
    urls?: Record<'url' | 'name', string>[];
    patchDocumentOnRequest?: <TRequest = any, TResponse = any> (req: TRequest, res: TResponse, document: OpenAPIObject) => OpenAPIObject;
}
