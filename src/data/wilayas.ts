// src/data/wilayas.ts
// Official list of the 58 Algerian wilayas, numbered per Algerian administrative law.
// Used for the searchable/filterable wilaya dropdown in the Vote Form.

export interface Wilaya {
  code: string; // Official 2-digit wilaya code (01-58)
  ar: string;
  en: string;
  fr: string;
}

export const wilayas: Wilaya[] = [
  { code: "01", ar: "أدرار", en: "Adrar", fr: "Adrar" },
  { code: "02", ar: "الشلف", en: "Chlef", fr: "Chlef" },
  { code: "03", ar: "الأغواط", en: "Laghouat", fr: "Laghouat" },
  { code: "04", ar: "أم البواقي", en: "Oum El Bouaghi", fr: "Oum El Bouaghi" },
  { code: "05", ar: "باتنة", en: "Batna", fr: "Batna" },
  { code: "06", ar: "بجاية", en: "Béjaïa", fr: "Béjaïa" },
  { code: "07", ar: "بسكرة", en: "Biskra", fr: "Biskra" },
  { code: "08", ar: "بشار", en: "Béchar", fr: "Béchar" },
  { code: "09", ar: "البليدة", en: "Blida", fr: "Blida" },
  { code: "10", ar: "البويرة", en: "Bouira", fr: "Bouira" },
  { code: "11", ar: "تمنراست", en: "Tamanrasset", fr: "Tamanrasset" },
  { code: "12", ar: "تبسة", en: "Tébessa", fr: "Tébessa" },
  { code: "13", ar: "تلمسان", en: "Tlemcen", fr: "Tlemcen" },
  { code: "14", ar: "تيارت", en: "Tiaret", fr: "Tiaret" },
  { code: "15", ar: "تيزي وزو", en: "Tizi Ouzou", fr: "Tizi Ouzou" },
  { code: "16", ar: "الجزائر", en: "Algiers", fr: "Alger" },
  { code: "17", ar: "الجلفة", en: "Djelfa", fr: "Djelfa" },
  { code: "18", ar: "جيجل", en: "Jijel", fr: "Jijel" },
  { code: "19", ar: "سطيف", en: "Sétif", fr: "Sétif" },
  { code: "20", ar: "سعيدة", en: "Saïda", fr: "Saïda" },
  { code: "21", ar: "سكيكدة", en: "Skikda", fr: "Skikda" },
  { code: "22", ar: "سيدي بلعباس", en: "Sidi Bel Abbès", fr: "Sidi Bel Abbès" },
  { code: "23", ar: "عنابة", en: "Annaba", fr: "Annaba" },
  { code: "24", ar: "قالمة", en: "Guelma", fr: "Guelma" },
  { code: "25", ar: "قسنطينة", en: "Constantine", fr: "Constantine" },
  { code: "26", ar: "المدية", en: "Médéa", fr: "Médéa" },
  { code: "27", ar: "مستغانم", en: "Mostaganem", fr: "Mostaganem" },
  { code: "28", ar: "المسيلة", en: "M'Sila", fr: "M'Sila" },
  { code: "29", ar: "معسكر", en: "Mascara", fr: "Mascara" },
  { code: "30", ar: "ورقلة", en: "Ouargla", fr: "Ouargla" },
  { code: "31", ar: "وهران", en: "Oran", fr: "Oran" },
  { code: "32", ar: "البيض", en: "El Bayadh", fr: "El Bayadh" },
  { code: "33", ar: "إليزي", en: "Illizi", fr: "Illizi" },
  { code: "34", ar: "برج بوعريريج", en: "Bordj Bou Arreridj", fr: "Bordj Bou Arréridj" },
  { code: "35", ar: "بومرداس", en: "Boumerdès", fr: "Boumerdès" },
  { code: "36", ar: "الطارف", en: "El Tarf", fr: "El Tarf" },
  { code: "37", ar: "تندوف", en: "Tindouf", fr: "Tindouf" },
  { code: "38", ar: "تيسمسيلت", en: "Tissemsilt", fr: "Tissemsilt" },
  { code: "39", ar: "الوادي", en: "El Oued", fr: "El Oued" },
  { code: "40", ar: "خنشلة", en: "Khenchela", fr: "Khenchela" },
  { code: "41", ar: "سوق أهراس", en: "Souk Ahras", fr: "Souk Ahras" },
  { code: "42", ar: "تيبازة", en: "Tipaza", fr: "Tipaza" },
  { code: "43", ar: "ميلة", en: "Mila", fr: "Mila" },
  { code: "44", ar: "عين الدفلى", en: "Aïn Defla", fr: "Aïn Defla" },
  { code: "45", ar: "النعامة", en: "Naâma", fr: "Naâma" },
  { code: "46", ar: "عين تموشنت", en: "Aïn Témouchent", fr: "Aïn Témouchent" },
  { code: "47", ar: "غرداية", en: "Ghardaïa", fr: "Ghardaïa" },
  { code: "48", ar: "غليزان", en: "Relizane", fr: "Relizane" },
  { code: "49", ar: "تيميمون", en: "Timimoun", fr: "Timimoun" },
  { code: "50", ar: "برج باجي مختار", en: "Bordj Badji Mokhtar", fr: "Bordj Badji Mokhtar" },
  { code: "51", ar: "أولاد جلال", en: "Ouled Djellal", fr: "Ouled Djellal" },
  { code: "52", ar: "بني عباس", en: "Béni Abbès", fr: "Béni Abbès" },
  { code: "53", ar: "عين صالح", en: "In Salah", fr: "In Salah" },
  { code: "54", ar: "عين قزام", en: "In Guezzam", fr: "In Guezzam" },
  { code: "55", ar: "تقرت", en: "Touggourt", fr: "Touggourt" },
  { code: "56", ar: "جانت", en: "Djanet", fr: "Djanet" },
  { code: "57", ar: "المغير", en: "El M'Ghair", fr: "El M'Ghair" },
  { code: "58", ar: "المنيعة", en: "El Meniaa", fr: "El Méniaa" }
];