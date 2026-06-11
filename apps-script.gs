/**
 * RECEPTOR DE LEADS — Formulário de Tráfego Pago
 *
 * COMO INSTALAR:
 * 1. Crie uma planilha nova no Google Sheets (ex: "Leads — Tráfego E-commerce")
 * 2. Menu Extensões → Apps Script
 * 3. Apague o conteúdo e cole este código
 * 4. Clique em "Implantar" → "Nova implantação"
 *    - Tipo: App da Web
 *    - Executar como: Eu (sua conta)
 *    - Quem pode acessar: Qualquer pessoa
 * 5. Autorize as permissões quando pedir
 * 6. Copie a URL gerada (termina em /exec) e cole na constante
 *    SHEETS_WEBHOOK_URL dentro do index.html
 *
 * IMPORTANTE: se editar este código depois, é preciso criar uma
 * NOVA implantação (ou gerenciar a existente e atualizar a versão),
 * senão a URL continua servindo a versão antiga.
 */

const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // cria a aba com cabeçalho na primeira execução
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Data/Hora', 'Nome', 'WhatsApp', 'Instagram',
        'Faturamento', 'Investimento R$1.500', 'Qualificado', 'Origem'
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss'),
      data.nome || '',
      data.whatsapp || '',
      data.instagram || '',
      data.faturamento || '',
      data.investimento || '',
      data.qualificado || '',
      data.origem || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
