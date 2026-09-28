# Produkty — formularz dodawania produktu

Zadanie rekrutacyjne: trzyetapowy formularz dodawania produktu w modalu + katalog z paginacją.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Form + Zod
- nuqs (paginacja w URL)

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja: [http://localhost:3000](http://localhost:3000)

Inne skrypty:

```bash
npm run build   # produkcyjny build
npm run start   # serwer po buildzie
npm run lint
```

---

## Decyzje projektowe

Figma jest źródłem prawdy wizualnej. W kilku miejscach poszczególne stany lub frame’y różnią się od siebie — poniżej krótkie notatki, jak te szczegóły zostały domknięte, żeby UI było spójne i przewidywalne.

### Design (Figma)

| Temat | Obserwacja | Decyzja |
| --- | --- | --- |
| Hover primary | Ciemniejszy hover pojawia się głównie przy „Dalej”; pozostałe CTA primary mają jaśniejszy / niebieski wariant | Wspólny hover primary (`#1d4ed8`) dla wszystkich przycisków tego typu |
| Aktywna strona paginacji | W części ekranów wyróżnienie aktywnej strony jest mniej wyraźne | Stałe tło primary na aktywnej stronie — łatwiej odczytać bieżącą pozycję |
| Etykieta pola opisu (krok 1) | Textarea ma placeholder opisu, a w designie etykietę powtórzoną z pola nazwy | Etykieta **Opis produktu**, zgodnie ze specyfikacją (pole opcjonalne) |
| Zaokrąglenie „Wstecz” w dialogu | W zależności od kroku przycisk bywa bardziej lub mniej zaokrąglony | `rounded-full` w całej stopce dialogu — w linii z większością CTA z projektu |

Zasada: trzymam się Figmy wszędzie, gdzie stany są jednoznaczne; przy drobnych rozjazdach między frame’ami wybieram wariant, który lepiej spina się w jeden spójny komponent.
