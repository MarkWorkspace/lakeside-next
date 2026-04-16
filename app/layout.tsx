import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Купить дом 241 м² в КП «Павловы озера» — Элитная недвижимость на Новой Риге',
  description: 'Готовый дом 241 м² с мебелью в элитном КП «Павловы озера». Прямая продажа от собственника. 7,5 соток ИЖС, 20 км от МКАД по Новорижскому шоссе. Узнайте цену!',
  openGraph: {
    title: 'Дом 241 м² в КП «Павловы озера» на Новой Риге',
    description: 'Продается готовый дом с мебелью и всеми коммуникациями. Прямая продажа от собственника. Участок 7,5 соток (ИЖС), 20 км от МКАД.',
    url: '/',
    siteName: 'Дом у озера',
    images: [
      {
        url: '/images/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Премиальный загородный дом 241 м² в КП Павловы озера',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Дом 241 м² в КП «Павловы озера» на Новой Риге',
    description: 'Продается готовый дом с мебелью и всеми коммуникациями. Прямая продажа от собственника.',
    images: ['/images/hero.webp'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SingleFamilyResidence',
    name: 'Готовый дом 241 м² в КП «Павловы озера»',
    description: 'Продается готовый премиальный загородный дом площадью 241 м² с мебелью в коттеджном поселке «Павловы озера». Участок 7,5 соток (ИЖС). 20 км от МКАД по Новорижскому шоссе.',
    image: '/images/hero.webp',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Лесная улица, 8',
      addressLocality: 'деревня Исаково',
      addressRegion: 'Московская область',
      addressCountry: 'RU'
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: 241,
      unitCode: 'MTK' // Square meter
    },
    numberOfRooms: 4,
    offers: {
      '@type': 'Offer',
      price: '59000000',
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
      url: '/',
      seller: {
        '@type': 'Person',
        name: 'Собственник'
      }
    }
  };

  return (
    <html
      lang="ru"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-neutral-900 relative">
        {children}
        
        {process.env.NEXT_PUBLIC_YANDEX_METRICA_ID && (
          <>
            <Script id="yandex-metrica" strategy="afterInteractive">
              {`
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
             
                ym(${process.env.NEXT_PUBLIC_YANDEX_METRICA_ID}, "init", {
                     clickmap:true,
                     trackLinks:true,
                     accurateTrackBounce:true,
                     webvisor:true
                });
              `}
            </Script>
            <noscript>
              <div>
                <img src={`https://mc.yandex.ru/watch/${process.env.NEXT_PUBLIC_YANDEX_METRICA_ID}`} style={{ position: 'absolute', left: '-9999px' }} alt="" />
              </div>
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
