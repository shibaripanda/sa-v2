import { LengIndexes, LengInstruction } from './text.schema';

export const myLengs: LengIndexes[] = [
  { title: 'Русский', index: 'ru', info: 'русский' },
  { title: 'English', index: 'en', info: 'английский' },
  { title: 'Español', index: 'es', info: 'испанский' },
  { title: 'Français', index: 'fr', info: 'французский' },
  { title: 'Português', index: 'pt', info: 'португальский' },
  { title: 'Deutsch', index: 'de', info: 'немецкий' },
  { title: '中文', index: 'zh', info: 'китайский' },
  { title: 'Italiano', index: 'it', info: 'итальянский' },
  { title: '日本語', index: 'ja', info: 'японский' },
  { title: '한국어', index: 'ko', info: 'корейский' },
  { title: 'العربية', index: 'ar', info: 'арабский' },
  { title: 'हिन्दी', index: 'hi', info: 'хинди' },
  { title: 'עברית', index: 'he', info: 'иврит' },
  { title: 'Türkçe', index: 'tr', info: 'турецкий' },
  { title: 'Tiếng Việt', index: 'vi', info: 'вьетнамский' },
  { title: 'Nederlands', index: 'nl', info: 'голландский' },
  { title: 'Polski', index: 'pl', info: 'польский' },
  { title: 'Bahasa Indonesia', index: 'id', info: 'индонезийский' },
  { title: 'Svenska', index: 'sv', info: 'шведский' },
  { title: 'Čeština', index: 'cs', info: 'чешский' },
  { title: 'Українська', index: 'uk', info: 'украинский' },
  { title: 'Magyar', index: 'hu', info: 'венгерский' },
  { title: 'ไทย', index: 'th', info: 'тайский' },
  { title: 'Ελληνικά', index: 'el', info: 'греческий' },
  { title: 'Dansk', index: 'da', info: 'датский' },
  { title: 'Suomi', index: 'fi', info: 'финский' },
  { title: 'Română', index: 'ro', info: 'румынский' },
  { title: 'Slovenčina', index: 'sk', info: 'словацкий' },
  { title: 'Беларуская', index: 'be', info: 'белорусский' },
];

export const myLib: LengInstruction[] = [
  {
    rutext: 'Произошла ошибка, попробуйте еще раз...',
    index: 'itWasErrorLate',
    update: false,
  },
  {
    rutext: 'Обновление информации',
    index: 'updatingData',
    update: false,
  },
  {
    rutext: 'Примеры',
    index: 'examples',
    update: false,
  },
  {
    rutext: 'Неразрешенные символы',
    index: 'badsimvols',
    update: false,
  },
  {
    rutext: 'Пусто',
    index: 'empty',
    update: false,
  },
  {
    rutext: 'Отмена',
    index: 'cancel',
    update: false,
  },
  {
    rutext: 'Редактировать',
    index: 'edit',
    update: false,
  },
  {
    rutext: 'Сохранить',
    index: 'save',
    update: false,
  },
  {
    rutext: 'Заказы',
    index: 'orders',
    update: false,
  },
  {
    rutext: 'Ты владелец',
    index: 'youOwner',
    update: false,
  },
  {
    rutext: 'Создаем новую компанию',
    index: 'createNewCompany',
    update: false,
  },
  {
    rutext: 'Получение данных с сервера',
    index: 'getUserServices',
    update: false,
  },
  {
    rutext: 'Загрузка...',
    index: 'loading',
    update: false,
  },
  {
    rutext: 'Создать новую компанию',
    index: 'addNewCompany',
    update: false,
  },
  { rutext: 'Привет', index: 'hello', update: false },
  {
    rutext: 'Пользователь не найден или произошла ошибка',
    index: 'userError1',
    update: false,
  },
  {
    rutext: 'Выход',
    index: 'exit',
    update: false,
  },
  {
    rutext: 'Добавить новый сервис',
    index: 'crateNewService',
    update: false,
  },
  {
    rutext: 'Сервисы',
    index: 'services',
    update: false,
  },
];
