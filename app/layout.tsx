import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: 'Дом у озера - Премиальная недвижимость',
  description: 'Готовый дом 241 м² в КП «Павловы озера». Прямая продажа.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} h-full antialiased`}
    >
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
