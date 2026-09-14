/**
 * Утилиты валидации и классификации телефонных номеров РФ
 */

export interface PhoneValidationResult {
  isValid: boolean;
  normalized: string; // 10 цифр без +7/8
  fullPhone: string;  // +7XXXXXXXXXX
  isMoscowRegion: boolean;
  error?: string;
}

// Коды фиксированной связи Москвы и Московской области
const MOSCOW_LANDLINE_CODES = new Set(['495', '496', '498', '499']);

// Основные мобильные и виртуальные DEF-префиксы Москвы и МО
// (включая ключевые пулы МТС, Мегафон, Билайн, Tele2/Т-Мобайл Московского региона)
const MOSCOW_MOBILE_CODES = new Set([
  '916', '925', '926', '985', '977', // Строго Московские пулы
  '495', '499', '496', '498',
  '901', '903', '905', '906', '909',
  '910', '915', '917', '919',
  '929', '962', '963', '964', '965', '966', '967', '968', '969',
  '991', '993', '995', '996', '999'
]);

export function validateAndClassifyPhone(rawPhone: string): PhoneValidationResult {
  if (!rawPhone || typeof rawPhone !== 'string') {
    return { isValid: false, normalized: '', fullPhone: '', isMoscowRegion: false, error: 'Номер телефона не указан' };
  }

  const digits = rawPhone.replace(/\D/g, '');

  // Должно быть 10 или 11 цифр для номеров РФ
  if (digits.length < 10 || digits.length > 11) {
    return {
      isValid: false,
      normalized: '',
      fullPhone: '',
      isMoscowRegion: false,
      error: 'Введите полный номер телефона из 10-11 цифр'
    };
  }

  let normalized = '';
  if (digits.length === 11) {
    const firstDigit = digits[0];
    if (firstDigit !== '7' && firstDigit !== '8') {
      return {
        isValid: false,
        normalized: '',
        fullPhone: '',
        isMoscowRegion: false,
        error: 'Поддерживаются только номера телефонов РФ (+7)'
      };
    }
    normalized = digits.slice(1);
  } else {
    // 10 цифр (например, 9161234567)
    normalized = digits;
  }

  // Проверка на фейковые / повторяющиеся номера (например, 9999999999, 1111111111, 0000000000)
  if (/^(\d)\1{9}$/.test(normalized)) {
    return {
      isValid: false,
      normalized,
      fullPhone: `+7${normalized}`,
      isMoscowRegion: false,
      error: 'Указан некорректный фиктивный номер'
    };
  }

  // Проверка на очевидные тестовые последовательности
  if (normalized === '1234567890' || normalized === '0987654321') {
    return {
      isValid: false,
      normalized,
      fullPhone: `+7${normalized}`,
      isMoscowRegion: false,
      error: 'Указан тестовый номер'
    };
  }

  const prefix = normalized.substring(0, 3);

  // В РФ мобильные номера начинаются с 9, московские городские - с 4
  const isValidRussianPrefix = prefix.startsWith('9') || MOSCOW_LANDLINE_CODES.has(prefix);
  if (!isValidRussianPrefix) {
    return {
      isValid: false,
      normalized,
      fullPhone: `+7${normalized}`,
      isMoscowRegion: false,
      error: 'Указан некорректный код оператора'
    };
  }

  const isMoscowRegion = MOSCOW_LANDLINE_CODES.has(prefix) || MOSCOW_MOBILE_CODES.has(prefix);

  return {
    isValid: true,
    normalized,
    fullPhone: `+7${normalized}`,
    isMoscowRegion
  };
}
