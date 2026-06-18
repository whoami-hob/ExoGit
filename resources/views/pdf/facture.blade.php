<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Facture {{ $facture->facture_number }} - EXOGIT</title>
    <link rel="icon" type="image/x-icon" href="/favicon1.ico">
    <style>
        @page { margin: 40px 50px; }
        body { 
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
            color: #1f2937; 
            font-size: 12px; 
            line-height: 1.6; 
        }
        
        .invoice-box { max-width: 100%; margin: auto; }
        
        .header-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
        .logo-td { width: 50%; vertical-align: middle; }
        .logo-img { max-height: 55px; width: auto; display: block; }
        .title-td { width: 50%; text-align: right; vertical-align: middle; }
        .invoice-title { 
            font-size: 26px; 
            font-weight: 800; 
            color: #059669; 
            margin: 0; 
            letter-spacing: 1px;
        }
        
        .divider { 
            height: 3px; 
            background: linear-gradient(to right, #0744d2, #0744d2); 
            background-color: #059669; /* fallback */
            margin-bottom: 30px; 
            border-radius: 2px;
        }

        .info-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .info-td { width: 48%; vertical-align: top; }
        .info-card { 
            background-color: #f9fafb; 
            border: 1px solid #e5e7eb; 
            border-radius: 8px; 
            padding: 14px; 
            min-height: 100px;
        }
        .space-td { width: 4%; }
        .card-title { 
            font-size: 10px; 
            font-weight: bold; 
            color: #6b7280; 
            text-transform: uppercase; 
            margin-bottom: 6px; 
            letter-spacing: 0.5px;
        }
        .card-content { font-size: 12px; color: #374151; line-height: 1.5; }
        
        .details-bar { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 30px; 
            background-color: #f3f4f6; 
            border-radius: 6px;
        }
        .details-bar td { padding: 10px 14px; font-size: 11px; color: #4b5563; }
        .details-bar strong { color: #111827; }

        .main-table { width: 100%; border-collapse: collapse; margin-bottom: 35px; text-align: left; }
        .main-table th { 
            background-color: #1f2937; 
            color: #ffffff; 
            text-transform: uppercase; 
            font-size: 10px; 
            font-weight: bold; 
            padding: 10px 12px; 
            letter-spacing: 0.5px;
        }
        .main-table th.rounded-left { border-top-left-radius: 6px; border-bottom-left-radius: 6px; }
        .main-table th.rounded-right { border-top-right-radius: 6px; border-bottom-right-radius: 6px; }
        
        .main-table td { padding: 12px 12px; border-bottom: 1px solid #e5e7eb; color: #374151; font-size: 11.5px; }
        .main-table tr:nth-child(even) td { background-color: #f9fafb/50; }
        
        .badge-unpaid { 
            color: #dc2626; 
            background-color: #fef2f2; 
            border: 1px solid #fca5a5; 
            padding: 2px 8px; 
            font-weight: bold; 
            border-radius: 4px; 
            font-size: 10px; 
            display: inline-block; 
        }

        .totals-container { width: 100%; margin-top: 15px; }
        .totals-table { float: right; width: 40%; border-collapse: collapse; }
        .totals-table td { padding: 6px 8px; text-align: right; font-size: 12px; color: #4b5563; }
        .totals-table .amount { font-weight: bold; color: #111827; }
        
        .totals-table .final-row td { 
            padding: 10px 8px; 
            font-weight: bold; 
            font-size: 14px; 
            color: #0035a6; 
            background-color: #ecfdf5; 
            border-top: 1px solid #a7f3d0;
            border-bottom: 1px solid #a7f3d0;
        }
        .totals-table .final-row td.rounded-total-left { border-top-left-radius: 6px; border-bottom-left-radius: 6px; }
        .totals-table .final-row td.rounded-total-right { border-top-right-radius: 6px; border-bottom-right-radius: 6px; }
        
        .footer-note { margin-top: 120px; text-align: center; font-size: 10px; color: #9ca3af; border-top: 1px solid #f3f4f6; padding-top: 15px; }
    </style>
</head>
<body>

<div class="invoice-box">
    <table class="header-table">
        <tr>
            <td class="logo-td">
                @if(file_exists(public_path('images/ExoGit.jpeg')))
                    <img src="data:image/jpeg;base64,{{ base64_encode(file_get_contents(public_path('images/ExoGit.jpeg'))) }}" class="logo-img">
                @else
                    <span style="font-size: 26px; font-weight: 800; color: #051396;">EXOGIT</span>
                @endif
            </td>
            <td class="title-td">
                <h1 class="invoice-title">FACTURE</h1>
            </td>
        </tr>
    </table>

    <div class="divider"></div>

    <table class="details-bar">
        <tr>
            <td><strong>N° de Facture :</strong> {{ $facture->facture_number }}</td>
            <td style="text-align: center;"><strong>Date d'émission :</strong> {{ \Carbon\Carbon::parse($facture->facture_date)->format('d/m/Y') }}</td>
            <td style="text-align: right;"><strong>Statut :</strong> 
                @if($facture->status === 'Payee')
                    <span style="color: #16a34a; font-weight: bold;">Payée</span>
                @else
                    <span class="badge-unpaid">Non Payée</span>
                @endif
            </td>
        </tr>
    </table>

    <table class="info-table">
        <tr>
            <td class="info-td">
                <div class="info-card">
                    <div class="card-title">Émis par :</div>
                    <div class="card-content">
                        <strong>EXOGIT S.A.R.L</strong><br>
                        Sale, Maroc<br>
                        <span style="color:#6b7280;"><span style="font-weight: bold;">Email:</span> contact@exogit.com</span>
                        <br>
                        <span style="color:#6b7280;"><span style="font-weight: bold;">Tél:</span> +212 6 93 67 59 19</span>
                    </div>
                </div>
            </td>
            <td class="space-td"></td>
            <td class="info-td">
                <div class="info-card">
                    <div class="card-title">Facturé à :</div>
                    <div class="card-content">
                        <strong>{{ $facture->client->name ?? 'Client inconnu' }}</strong><br>
                        @if(isset($facture->client->email))
                            <span style="color:#6b7280;"><span style="font-weight: bold;">Email:</span> {{ $facture->client->email }}</span><br>
                            @endif
                        @if(isset($facture->client->phone))
                            <span style="color:#6b7280;"><span style="font-weight: bold;">Tél:</span> {{ $facture->client->phone }}</span><br>
                        @endif
                    </div>
                </div>
            </td>
        </tr>
    </table>
    <br><br><br>

    <table class="main-table">
        <thead>
            <tr>
                <th class="rounded-left">Désignation / Produit</th>
                <th style="text-align: center; width: 10%;">Qté</th>
                <th style="text-align: right; width: 20%;">Prix Unitaire</th>
                <th class="rounded-right" style="text-align: right; width: 25%;">Montant HT</th>
            </tr>
        </thead>
        <tbody>
            @foreach($facture->items as $item)
                <tr>
                    <td style="font-weight: 600; color: #111827;">
                        {{ $item->product->name ?? 'Produit' }}
                    </td>
                    <td style="text-align: center; font-weight: bold; color: #4b5563;">{{ $item->quantity }}</td>
                    <td style="text-align: right; color: #4b5563;">{{ number_format($item->unit_price, 2, ',', ' ') }} DH</td>
                    <td style="text-align: right; font-weight: 600; color: #111827;">{{ number_format($item->quantity * $item->unit_price, 2, ',', ' ') }} DH</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals-container">
        <table class="totals-table">
            <tr>
                <td style="text-align: left;">Total Brut (HT) :</td>
                <td class="amount">{{ number_format($facture->total_ttc / 1.2, 2, ',', ' ') }} DH</td>
            </tr>
            <tr>
                <td style="text-align: left;">TVA (20%) :</td>
                <td class="amount" style="color: #6b7280;">{{ number_format(($facture->total_ttc / 1.2) * 0.2, 2, ',', ' ') }} DH</td>
            </tr>
            <tr class="final-row">
                <td class="rounded-total-left" style="text-align: left;">Total TTC :</td>
                <td class="rounded-total-right" style="text-align: right;">{{ number_format($facture->total_ttc, 2, ',', ' ') }} DH</td>
            </tr>
        </table>
    </div>

    <div class="footer-note">
        Merci pour votre confiance.<br>
        <span style="font-weight: bold; color: #4b5563;">EXOGIT</span> — Solutions technologiques et Cloud sur mesure.
    </div>
</div>

</body>
</html>