# Vocabulary Schema Quick Reference

## Summary

**Total Fields:** 26  
**Content Type Name:** `vocabulary-entry`  
**Single table with discriminator:** `word_type` field

---

## Field List (Copy-Paste Ready)

### Core Fields (6)
1. `word_type` - **Enumeration** - Required - Values: `verb`, `substantive`, `indeclinable`
2. `word_devanagari` - **Text (Short)** - Required
3. `order_index` - **Number (integer)** - Default: 0
4. `is_published` - **Boolean** - Default: false
5. `lesson_reference` - **Text (Short)**
6. `notes` - **Text (Long)**

### Transliteration Fields (3)
7. `itrans` - **Text (Short)**
8. `iast` - **Text (Short)**
9. `harvard_kyoto` - **Text (Short)**

### Translation Fields (3)
10. `meaning_pt` - **Text (Long)** - Portuguese
11. `meaning_es` - **Text (Long)** - Spanish
12. `meaning_en` - **Text (Long)** - English

### Substantive Fields (1)
13. `gender` - **Enumeration** - Values: `masculine`, `feminine`, `neuter`

### Indeclinable Fields (1)
14. `grammatical_case` - **Text (Short)**

### Verb Fields (11)
15. `root_devanagari` - **Text (Short)**
16. `verb_class` - **Number (integer)** - Min: 1, Max: 10
17. `voice` - **Enumeration** - Values: `parasmaipada`, `atmanepada`, `ubhayapada`
18. `standard_form` - **Text (Short)**
19. `past_imperfect` - **Text (Short)**
20. `potential` - **Text (Short)**
21. `imperative` - **Text (Short)**
22. `past_participle` - **Text (Short)**
23. `gerund` - **Text (Short)**
24. `infinitive` - **Text (Short)**
25. `ppp` - **Text (Short)**

---

## Enumeration Values (Copy These Exactly)

### word_type
```
verb
substantive
indeclinable
```

### gender
```
masculine
feminine
neuter
```

### voice
```
parasmaipada
atmanepada
ubhayapada
```

---

## Spreadsheet to Strapi Mapping

### Sheet 1: Substantivos → word_type = "substantive"
- Column A (सुबन्तं) → `word_devanagari`
- Column B (लिङ्गं) → `gender` (convert: पुं→masculine, स्त्री→feminine, नपुंसक→neuter)
- Column C (अर्थ) → `meaning_es`
- Column D (ITRANS) → `itrans`
- Column E (IATS) → `iast`
- Column F (Harvard-Kyoto) → `harvard_kyoto`

### Sheet 2: Indeclinables → word_type = "indeclinable"
- Column A (अव्यय) → `word_devanagari`
- Column B (अर्थ) → `meaning_es`
- Column C (विभक्ति) → `grammatical_case`
- Column D (ITRANS) → `itrans`
- Column E (IATS) → `iast`
- Column F (Harvard-Kyoto) → `harvard_kyoto`

### Sheet 3: Verbos → word_type = "verb"
- Column A (धातु) → `word_devanagari` + `root_devanagari`
- Column B (गण) → `verb_class`
- Column C (पद) → `voice` (convert: P→parasmaipada, A→atmanepada, U→ubhayapada)
- Column D (सिद्धान्त रूप) → `standard_form`
- Column E (अर्थ) → `meaning_es`
- Column F (लट्) → `past_imperfect`
- Column G (लिङ्) → `potential`
- Column H (लोट्) → `imperative`
- Column I (क्त Pasado) → `past_participle`
- Column J (क्त्वा) → `gerund`
- Column K (तुमुन्) → `infinitive`
- Column L (क्त PPP) → `ppp`
- Column M (ITRANS) → `itrans`
- Column N (IATS) → `iast`
- Column O (Harvard-Kyoto) → `harvard_kyoto`

---

## Why Single Table?

✅ **Pros:**
- Unified search across all word types
- Single API endpoint
- Lower API costs (1 call vs 3)
- Easier to maintain
- Better student UX

⚠️ **Cons:**
- Some nullable fields (verbs have gerund, nouns don't)
- Need conditional validation in app logic

---

## Next Steps After Creating in Strapi

1. ✅ Create content type in Strapi UI
2. 📝 Export spreadsheets to CSV
3. 🔄 Write import script to normalize data
4. 📤 Import via Strapi API
5. ✅ Validate in Strapi admin
6. 🔧 Add API functions in frontend
7. 🎨 Build vocabulary search page
