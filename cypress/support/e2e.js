// Importa o comando de snapshot de imagem
import { addMatchImageSnapshotCommand } from '@simonsmith/cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
    failureThreshold: 0.18, // Exemplo: 18% de tolerância
    failureThresholdType: 'percent', // Tipo de tolerância: 'percent' ou 'pixel'
});