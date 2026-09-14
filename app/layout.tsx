import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import SmoothScroll from "./SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://xn--80aaenjeva2aw3a.xn--p1ai' : 'http://localhost:3000');

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#18181b",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Купить дом 241 м² в КП «Павловы озера» — Элитная недвижимость на Новой Риге',
  description: 'Готовый дом 241 м² с мебелью в элитном КП «Павловы озера». Прямая продажа от собственника. 7,5 соток ИЖС, 20 км от МКАД по Новорижскому шоссе. Узнайте цену!',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Дом 241 м² в КП «Павловы озера» на Новой Риге',
    description: 'Продается готовый дом с мебелью и всеми коммуникациями. Прямая продажа от собственника. Участок 7,5 соток (ИЖС), 20 км от МКАД.',
    url: siteUrl,
    siteName: 'Дом у озера',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Готовый загородный дом 241 м² в КП Павловы озера',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Дом 241 м² в КП «Павловы озера» на Новой Риге',
    description: 'Продается готовый дом с мебелью и всеми коммуникациями. Прямая продажа от собственника.',
    images: ['/opengraph-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Дом у озера — Резиденция в КП «Павловы Озера»',
        description: 'Официальный сайт продажи готового дома 241 м² в КП «Павловы Озера» на Новорижском шоссе',
        inLanguage: 'ru-RU',
      },
      {
        '@type': 'ItemPage',
        '@id': `${siteUrl}/#webpage`,
        url: siteUrl,
        name: 'Купить готовый дом 241 м² в КП «Павловы Озера» на Новой Риге',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#residence` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Главная',
              item: siteUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Дом 241 м² в КП «Павловы Озера»',
              item: `${siteUrl}/#residence`,
            },
          ],
        },
      },
      {
        '@type': 'HomeAndConstructionBusiness',
        '@id': `${siteUrl}/#builder`,
        name: 'Стройся Вятка',
        alternateName: 'СК Стройся Вятка',
        description: 'Строительная компания полного цикла, производство современных энергоэффективных Prefab-домов заводского изготовления',
        knowsAbout: [
          'Prefab технологии',
          'Энергоэффективные каркасные дома',
          'Утепленная шведская плита (УШП)',
          'Выставка Open Village',
        ],
      },
      {
        '@type': 'RealEstateListing',
        '@id': `${siteUrl}/#listing`,
        name: 'Продажа готового дома 241 м² в КП «Павловы Озера»',
        url: siteUrl,
        datePosted: '2025-01-15',
        mainEntity: { '@id': `${siteUrl}/#residence` },
        offers: {
          '@type': 'Offer',
          '@id': `${siteUrl}/#offer`,
          price: 49900000,
          priceCurrency: 'RUB',
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
          url: siteUrl,
          seller: {
            '@type': 'Person',
            name: 'Собственник',
          },
        },
      },
      {
        '@type': 'SingleFamilyResidence',
        '@id': `${siteUrl}/#residence`,
        name: 'Готовый дом 241 м² в КП «Павловы озера»',
        description: 'Продается готовый премиальный загородный дом площадью 241 м² с мебелью в коттеджном поселке «Павловы озера». Участок 7,5 соток (ИЖС). 20 км от МКАД по Новорижскому шоссе. Построен СК «Стройся Вятка» для выставки Open Village 2025.',
        url: siteUrl,
        image: [
          `${siteUrl}/opengraph-image.jpg`,
          `${siteUrl}/images/hero.webp`,
          `${siteUrl}/images/gallery-1.webp`,
          `${siteUrl}/images/gallery-2.webp`,
          `${siteUrl}/images/plan-1.webp`,
          `${siteUrl}/images/plan-2.webp`,
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Лесная улица, 8, КП «Павловы озера»',
          addressLocality: 'деревня Исаково',
          addressRegion: 'Московская область',
          postalCode: '143581',
          addressCountry: 'RU',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 55.828157,
          longitude: 37.124370,
        },
        floorSize: {
          '@type': 'QuantitativeValue',
          value: 241,
          unitCode: 'MTK',
        },
        numberOfRooms: 4,
        numberOfBedrooms: 3,
        numberOfBathroomsTotal: 3,
        yearBuilt: 2025,
        containedInPlace: {
          '@type': 'Place',
          name: 'Коттеджный посёлок «Павловы озера»',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'деревня Исаково',
            addressRegion: 'Московская область',
            addressCountry: 'RU',
          },
        },
        amenityFeature: [
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Фундамент УШП (утепленная шведская плита)',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Приточно-вытяжная вентиляция с рекуперацией тепла',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Водяные теплые полы по всей площади',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Акустическая плавающая стяжка',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Магистральный газ и центральные коммуникации',
            value: true,
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Собственное озеро, пляж и набережная в поселке',
            value: true,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Дом находится в деревне Исаково или входит в состав коттеджного поселка?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Дом находится на закрытой охраняемой территории коттеджного поселка бизнес-класса «Павловы Озера» (г.о. Истра, д. Исаково, 20 км от МКАД по Новорижскому шоссе). Внутри поселка: асфальтированные дороги, освещение, детские площадки, продуктовый магазин, собственный пляж, озеро и причал. Въезд через КПП.',
            },
          },
          {
            '@type': 'Question',
            name: 'Этот дом строился на продажу? Кто застройщик?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Застройщик дома — строительная компания «Стройся Вятка», специализирующаяся на современных Prefab-домах заводского изготовления. Дом построен для участия в международной выставке Open Village 2025 как флагманский проект компании с передовыми решениями. Дом единственный в своем экземпляре.',
            },
          },
          {
            '@type': 'Question',
            name: 'Какие реальные расходы на эксплуатацию и отопление дома зимой?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Благодаря энергоэффективной плите УШП и системе вентиляции с рекуперацией тепла суммарные затраты на отопление газом, электроэнергию и обслуживание управляющей компании даже в холодные зимние месяцы составляют около 15 000 рублей в месяц.',
            },
          },
          {
            '@type': 'Question',
            name: 'Почему дом обшит нестроганой доской?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'На фасаде применена комбинированная отделка: штукатурка и оригинальная финская фасадная доска с тонкопиленой поверхностью. Шероховатость повышает адгезию лакокрасочного покрытия и толщину слоя краски, обеспечивая срок службы фасада более 15 лет без перекрашивания.',
            },
          },
          {
            '@type': 'Question',
            name: 'Почему цена дома на 30% выгоднее рыночной?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Для строительства дома под выставку Open Village 2025 известные поставщики предоставили материалы премиум-класса с максимальными выставочными скидками. Покупатель получает дом премиальной комплектации по цене на 30% ниже рыночной себестоимости строительства аналога.',
            },
          },
        ],
      },
    ],
  };

  return (
    <html
      lang="ru"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-neutral-900 relative">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        
        {process.env.NEXT_PUBLIC_YANDEX_METRICA_ID && (
          <>
            <Script id="yandex-metrica" strategy="afterInteractive">
              {`
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
             
                ym(${Number(process.env.NEXT_PUBLIC_YANDEX_METRICA_ID) || 0}, "init", {
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
