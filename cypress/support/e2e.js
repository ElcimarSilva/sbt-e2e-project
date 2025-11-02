// Importa o comando de snapshot de imagem
import { addMatchImageSnapshotCommand } from '@simonsmith/cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
    failureThreshold: 0.10, // Exemplo: 3% de tolerância
    failureThresholdType: 'percent', // Tipo de tolerância: 'percent' ou 'pixel'
});