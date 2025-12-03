// Importa o comando de snapshot de imagem
import { addMatchImageSnapshotCommand } from '@simonsmith/cypress-image-snapshot/command';

// Importa os commands customizados de API
import './api/api-commands';

addMatchImageSnapshotCommand({
    failureThreshold: 0.18, // Exemplo: 18% de tolerância
    failureThresholdType: 'percent', // Tipo de tolerância: 'percent' ou 'pixel'
});