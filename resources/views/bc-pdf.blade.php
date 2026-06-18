<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Bon de Commande {{ $devis->devis_number }} - EXOGIT</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; font-size: 12px; line-height: 1.6; padding: 5px; }
        .header-container { width: 100%; margin-bottom: 25px; }
        .logo-area { width: 55%; float: left; }
        .title-area { width: 45%; float: right; text-align: right; padding-top: 10px; }
        .logo-img { width: 150px; height: auto; }
        .invoice-title { font-size: 28px; font-weight: 900; color: #059669; margin: 0; }
        .devis-number { font-size: 14px; font-weight: bold; color: #059669; }
        .clear { clear: both; }
        .details-table { width: 100%; margin-top: 25px; border-collapse: collapse; }
        .details-table td { width: 50%; vertical-align: top; padding: 0; }
        .card-details { background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; margin-right: 10px; }
        .section-title { font-size: 11px; text-transform: uppercase; color: #065f46; font-weight: bold; border-bottom: 1px solid #bbf7d0; padding-bottom: 4px; }
        .items-table { width: 100%; border-collapse: collapse; margin-top: 25px; }
        .items-table th { background-color: #065f46; color: #ffffff; padding: 10px; font-size: 11px; text-transform: uppercase; }
        .items-table td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
        .signature-area { margin-top: 50px; width: 100%; }
        .signature-box { width: 45%; float: right; text-align: center; border-top: 1px solid #000; padding-top: 10px; }
    </style>
</head>
<body>

    <div class="header-container">
        <div class="logo-area">
            <img src="{{ public_path('images/ExoGit.jpeg') }}" class="logo-img">
        </div>
        <div class="title-area">
            <div class="invoice-title">BON DE COMMANDE</div>
            <div class="devis-number">N°: {{ $devis->devis_number }}</div>
        </div>
        <div class="clear"></div>
    </div>

    <table class="details-table">
        <tr>
            <td><div class="card-details"><div class="section-title">Émis par :</div><strong>EXOGIT </strong></div></td>
            <td><div class="card-details" style="background-color: #f8fafc; border-color: #e2e8f0;"><div class="section-title">Client :</div><strong>{{ $devis->client->name }}</strong></div></td>
        </tr>
    </table>

    <table class="items-table">
        <thead>
            <tr>
                <th style="text-align: left">Désignation</th><th>Qté</th><th>Prix Unit.</th><th>Total HT</th>
            </tr>
        </thead>
        <tbody>
            @foreach($devis->items as $item)
            <tr>
                <td style="text-align: left;">{{ $item->product->name }}</td>
                <td style="text-align: center;">{{ $item->quantity }}</td>
                <td style="text-align: center;">{{ number_format($item->unit_price, 2) }} DH</td>
                <td style="text-align: center;">{{ number_format($item->total, 2) }} DH</td>
            </tr>
            @endforeach
        </tbody>
        <br><br>
    </table> <div style="width: 100%; margin-top: 20px; page-break-inside: avoid;">
        <table style="width: 45%; float: right; border-collapse: collapse; margin-bottom: 30px;">
            <tr>
                <td style="padding: 8px 12px; font-size: 12px; border-bottom: 1px solid #f1f5f9; color: #475569; font-weight: 500; text-align: left;">Total Global HT</td>
                <td style="padding: 8px 12px; font-size: 12px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold; color: #0f172a;">{{ number_format($devis->total_ht, 2, '.', ' ') }} DH</td>
            </tr>
            <tr>
                <td style="padding: 8px 12px; font-size: 12px; border-bottom: 1px solid #f1f5f9; color: #475569; font-weight: 500; text-align: left;">TVA (20%)</td>
                <td style="padding: 8px 12px; font-size: 12px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold; color: #0f172a;">{{ number_format($devis->total_ttc - $devis->total_ht, 2, '.', ' ') }} DH</td>
            </tr>
            <tr style="background-color: #ecfdf5; border-top: 2px solid #065f46; border-bottom: 2px solid #065f46;">
                <td style="padding: 12px; font-size: 14px; color: #065f46; font-weight: bold; text-align: left;">Total TTC</td>
                <td style="padding: 12px; font-size: 14px; color: #065f46; font-weight: bold; text-align: right;">{{ number_format($devis->total_ttc, 2, '.', ' ') }} DH</td>
            </tr>
        </table>
        <div style="clear: both;"></div>
    </div>

    <br>
    <div class="signature-area">
        <p style="font-size: 10px; color: #475569;">
            En signant ce document, le client confirme sa commande et accepte les conditions de vente d'EXOGIT.
        </p>
        <div class="signature-box">
            Signature et Cachet du Client
        </div>
    </div>

</body>
</html>