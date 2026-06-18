<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Devis {{ $devis->devis_number }} - EXOGIT</title>
    <link rel="icon" type="image/x-icon" href="/../../public/images/favicon1.ico">
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; font-size: 12px; line-height: 1.6; padding: 5px; }
        
        .header-container { width: 100%; margin-bottom: 25px; }
        .logo-area { width: 55%; float: left; }
        .title-area { width: 45%; float: right; text-align: right; padding-top: 10px; }
        
        .logo-img { width: 150px; height: auto; margin-bottom: 6px; }
        .company-sub { font-size: 11px; color: #64748b; line-height: 1.4; padding-left: 2px; }
        
        .invoice-title { font-size: 32px; font-weight: 900; color: #0f172a; margin: 0; letter-spacing: 1px; }
        .devis-number { font-size: 14px; font-weight: bold; color: #2563eb; margin-top: 5px; }
        
        .clear { clear: both; }
        
        .details-table { width: 100%; margin-top: 25px; margin-bottom: 20px; border-collapse: collapse; }
        .details-table td { width: 50%; vertical-align: top; border: none; padding: 0; }
        .card-details { background-color: #fafafa; border: 1px solid #f1f5f9; padding: 15px; border-radius: 8px; margin-right: 10px; min-height: 105px; }
        .card-details.client-card { margin-right: 0; margin-left: 10px; background-color: #f8fafc; border-color: #e2e8f0; }
        
        .section-title { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; margin-bottom: 6px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
        .info-text { color: #334155; font-size: 12px; margin-top: 4px; }

        .items-table { width: 100%; border-collapse: collapse; margin-top: 25px; margin-bottom: 25px; }
        .items-table th { background-color: #0f172a; color: #ffffff; text-align: left; padding: 10px 12px; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
        .items-table td { padding: 12px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
        .items-table tr:nth-child(even) { background-color: #f8fafc; }
        
        .totals-container { width: 100%; margin-top: 10px; page-break-inside: avoid; }
        .totals-table { width: 45%; float: right; border-collapse: collapse; margin-bottom: 30px; }
        .totals-table td { padding: 8px 12px; font-size: 12px; border-bottom: 1px solid #f1f5f9; }
        .totals-table .label { text-align: left; color: #475569; font-weight: 500; }
        .totals-table .value { text-align: right; font-weight: bold; color: #0f172a; }
        .totals-table .final-row td { border-top: 2px solid #1e40af; border-bottom: 2px solid #1e40af; font-size: 16px; color: #1e40af; font-weight: bold; padding: 12px; background-color: #eff6ff; }
        
        .footer { position: fixed; bottom: -15px; left: 0; width: 100%; text-align: center; font-size: 9px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; line-height: 1.5; }
        .legal-text { font-weight: bold; color: #475569; }
    </style>
</head>
<body>

    <div class="header-container">
        <div class="logo-area">
            <img src="{{ public_path('images/ExoGit.jpeg') }}" class="logo-img" alt="EXOGIT Logo">
            <div class="company-sub">Sale, Maroc</div>
        </div>
        <div class="title-area">
            <div class="invoice-title">DEVIS</div>
            <div class="devis-number">N°: {{ $devis->devis_number }}</div>
        </div>
        <div class="clear"></div>
    </div>

    <table class="details-table">
        <tr>
            <td>
                <div class="card-details">
                    <div class="section-title">Émis par :</div>
                    <div class="info-text">
                        <strong>EXOGIT S.A.R.L AU</strong><br>
                        Email: contact@exogit.com<br>
                        Tél: +212 693-675919<br>
                        Date: {{ \Carbon\Carbon::parse($devis->devis_date)->format('d/m/Y') }}
                    </div>
                </div>
            </td>
            <td>
                <div class="card-details client-card">
                    <div class="section-title">Adressé à :</div>
                    <div class="info-text">
                        <strong>{{ $devis->client->name }}</strong><br>
                        @if($devis->client->ice) <span style="color: #475569;">ICE :</span> <strong>{{ $devis->client->ice }}</strong><br> @endif
                        @if($devis->client->email) Email: {{ $devis->client->email }}<br> @endif
                        @if($devis->client->phone) Tél: {{ $devis->client->phone }} @endif
                    </div>
                </div>
            </td>
        </tr>
    </table>
    <br><br><br>

    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 50%;">Désignation / Service</th>
                <th style="text-align: center; width: 10%;">Qté</th>
                <th style="text-align: right; width: 18%;">Prix Unit. HT</th>
                <th style="text-align: right; width: 22%;">Total HT</th>
            </tr>
        </thead>
        <tbody>
            @foreach($devis->items as $item)
            <tr>
                <td>
                    <div style="font-weight: bold; color: #0f172a; font-size: 12px;">{{ $item->product->name }}</div>
                    @if($item->product->description)
                        <div style="font-size: 10.5px; color: #64748b; margin-top: 3px; font-style: italic; line-height: 1.4;">{!! nl2br(e($item->product->description)) !!}</div>
                    @endif
                </td>
                <td style="text-align: center; color: #334155; font-weight: 500;">{{ $item->quantity }}</td>
                <td style="text-align: right; color: #334155;">{{ number_format($item->unit_price, 2, '.', ' ') }} DH</td>
                <td style="text-align: right; font-weight: bold; color: #0f172a;">{{ number_format($item->total, 2, '.', ' ') }} DH</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals-container">
        <table class="totals-table">
            <tr>
                <td class="label">Total Global HT</td>
                <td class="value">{{ number_format($devis->total_ht, 2, '.', ' ') }} DH</td>
            </tr>
            <tr>
                <td class="label">TVA (20%)</td>
                <td class="value">{{ number_format($devis->total_ttc - $devis->total_ht, 2, '.', ' ') }} DH</td>
            </tr>
            <tr class="final-row">
                <td class="label">Total TTC</td>
                <td class="value">{{ number_format($devis->total_ttc, 2, '.', ' ') }} DH</td>
            </tr>
        </table>
        <div class="clear"></div>
    </div>

    <div class="footer">
        <span class="legal-text">EXOGIT S.A.R.L. AU</span> - Capital: 100 000 DH - RC: XXXXX - CNSS: XXXXX - <span class="legal-text">ICE: 00XXXXXXXXXXXXXXXXX</span> <br>
        Valabilité du devis: 30 jours à compter de la date d'émission &bull; Merci pour votre confiance.
    </div>

</body>
</html>