<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; color: #333; line-height: 1.6; }
        
        /* ترويسة الصفحة */
        .header { display: table; width: 100%; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
        .logo-section { display: table-cell; width: 50%; }
        .info-section { display: table-cell; width: 50%; text-align: right; }
        .logo { width: 140px; }
        
        /* معلومات الفاتورة */
        .invoice-box { margin: 20px 0; }
        .title { font-size: 28px; font-weight: bold; color: #1e293b; }
        
        /* الجدول */
        table { width: 100%; border-collapse: collapse; margin: 25px 0; }
        th { background-color: #f8fafc; color: #475569; padding: 12px; border: 1px solid #e2e8f0; text-align: left; }
        td { padding: 12px; border: 1px solid #e2e8f0; }
        
        /* التذييل والتوقيع */
        .footer { margin-top: 50px; }
        .signature-box { float: right; border-top: 1px solid #000; width: 220px; text-align: center; padding-top: 10px; }
    </style>
</head>
<body>

    <div class="header">
        <div class="logo-section">
            <img src="{{ public_path('images/ExoGit.jpeg') }}" class="logo">
        </div>
        <div class="info-section">
            <div class="title">FACTURE D'ACHAT</div>
            <p>Date d'impression: {{ now()->format('d/m/Y') }}</p>
        </div>
    </div>

    <table>
        <tr><th>N° Facture</th><td>{{ $achat->reference }}</td></tr>
        <tr><th>Fournisseur</th><td>{{ $achat->fournisseur->nom }}</td></tr>
        <tr><th>Désignation Article</th><td>{{ $achat->nom_article }}</td></tr>
        <tr><th>Date d'opération</th><td>{{ $achat->date_achat }}</td></tr>
        <tr><th>Mode de Règlement</th><td>{{ strtoupper($achat->mode_paiement) }}</td></tr>
        <tr style="background-color: #eff6ff;">
            <th style="color: #2563eb;">MONTANT TOTAL TTC</th>
            <td style="font-weight: bold; font-size: 18px; color: #2563eb;">
                {{ number_format($achat->montant, 2) }} DH
            </td>
        </tr>
    </table>

    <div class="footer">
        <p style="font-size: 12px; color: #64748b;">Merci de votre confiance.</p>
        <div class="signature-box">
            <p>Signature & Cachet</p>
        </div>
    </div>

</body>
</html>