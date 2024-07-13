  import { Schema } from 'mongoose';
  import { readdirSync } from 'fs';
  import path from 'path';

  // Interface para representar o modelo carregado
  interface LoadedModel {
    name: string;
    model: any; // Tipo genérico para o modelo
    schema: Schema;
  }

  // Função para carregar todos os modelos de um diretório
  const loadModels = (): LoadedModel[] => {
    const modelsDir = path.join(__dirname, '../models');
    const modelFiles = readdirSync(modelsDir).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

    return modelFiles.map(file => {
      const modelName = path.basename(file, path.extname(file));
      const modelPath = path.join(modelsDir, file);
      const modelModule = require(modelPath); // Importa o módulo do modelo

      // Verifica se o modelo exporta uma instância válida
      if (!modelModule.default || !modelModule.default.getModel || typeof modelModule.default.getModel !== 'function') {
        throw new Error(`Modelo '${modelName}' não exporta um construtor válido.`);
      }

      // Cria uma instância do modelo e obtém o esquema
      const modelInstance = modelModule.default.getModel();
      const modelSchema = modelInstance.schema;

      return {
        name: modelName,
        model: modelInstance,
        schema: modelSchema,
      };
    });
  };

  // Função para verificar e adicionar campos faltantes
  const checkAndAddMissingFields = async (model: any, modelName: string, schema: Schema) => {
    const schemaPaths = schema.paths;
    const fieldNames = Object.keys(schemaPaths);

    const documents = await model.find({});
    for (const doc of documents) {
      let needsUpdate = false;
      for (const field of fieldNames) {
        if (!doc[field] && schemaPaths[field].options.default !== undefined) {
          doc[field] = schemaPaths[field].default;
          needsUpdate = true;
        }
      }
      if (needsUpdate) {
        await doc.save();
      }
    }
  };

  // Função principal de migração
  export const migrate = async () => {
    try {
      // Carregar todos os modelos do diretório
      const models = loadModels();

      // Iterar sobre cada modelo para realizar a migração
      for (const { name, model, schema } of models) {
        await checkAndAddMissingFields(model, name, schema);
        console.log(`Migração automática para o modelo '${name}' concluída`);
      }
    } catch (error) {
      console.error('Erro durante a migração automática:', error);
      throw error; // Você pode optar por lançar o erro para ser tratado fora deste módulo
    }
  };