# Strapi Vocabulary Setup Guide

## Content Type Configuration

**Collection Type Name:** `vocabulary-entry`  
**Display Name:** `Vocabulary Entry`  
**Description:** Sanskrit vocabulary with verbs, substantives, and indeclinables

---

## Fields to Create in Strapi UI

### 1. Basic Information Fields

| Field Name         | Type                 | Required | Advanced Settings                                                       |
| ------------------ | -------------------- | -------- | ----------------------------------------------------------------------- |
| `word_type`        | **Enumeration**      | ✅ Yes   | Values: `verb`, `substantive`, `indeclinable`<br>Default: `substantive` |
| `word_devanagari`  | **Text (Short)**     | ✅ Yes   | -                                                                       |
| `order_index`      | **Number (integer)** | ❌ No    | Default: `0`                                                            |
| `is_published`     | **Boolean**          | ❌ No    | Default: `false`                                                        |
| `lesson_reference` | **Text (Short)**     | ❌ No    | Example: "1U", "Lección 5"                                              |
| `notes`            | **Text (Long)**      | ❌ No    | Additional usage notes                                                  |

---

### 2. Transliteration Fields

| Field Name      | Type             | Required | Description                   |
| --------------- | ---------------- | -------- | ----------------------------- |
| `itrans`        | **Text (Short)** | ❌ No    | ITRANS transliteration        |
| `iast`          | **Text (Short)** | ❌ No    | IAST transliteration          |
| `harvard_kyoto` | **Text (Short)** | ❌ No    | Harvard-Kyoto transliteration |

---

### 3. Translation Fields (Multilingual)

| Field Name   | Type            | Required | Description            |
| ------------ | --------------- | -------- | ---------------------- |
| `meaning_pt` | **Text (Long)** | ❌ No    | Portuguese translation |
| `meaning_es` | **Text (Long)** | ❌ No    | Spanish translation    |
| `meaning_en` | **Text (Long)** | ❌ No    | English translation    |

---

### 4. Substantive-Specific Fields

| Field Name     | Type            | Required | Advanced Settings                         |
| -------------- | --------------- | -------- | ----------------------------------------- |
| `gender`       | **Enumeration** | ❌ No    | Values: `masculine`, `feminine`, `neuter` |
| `word_subtype` | **Enumeration** | ❌ No    | Values: `noun`, `adjective`, `pronoun`    |

**Notes:**

- Only populate for entries where `word_type` = `substantive`
- UI rendering:
  - `word_subtype = adjective` → shows `adj.`
  - `word_subtype = pronoun` → shows `pron.`
  - Otherwise (or `noun`) → shows `gender` (`m.`, `f.`, `n.`)

---

### 5. Indeclinable-Specific Fields

| Field Name         | Type             | Required | Description                          |
| ------------------ | ---------------- | -------- | ------------------------------------ |
| `grammatical_case` | **Text (Short)** | ❌ No    | Case notation (e.g., "+2°c", "+3°c") |

**Note:** Only populate for entries where `word_type` = `indeclinable`

---

### 6. Verb-Specific Fields

| Field Name        | Type                 | Required | Advanced Settings                                  |
| ----------------- | -------------------- | -------- | -------------------------------------------------- |
| `root_devanagari` | **Text (Short)**     | ❌ No    | Verb root in Devanagari (e.g., "√रह्")             |
| `verb_class`      | **Number (integer)** | ❌ No    | Min: 1, Max: 10                                    |
| `voice`           | **Enumeration**      | ❌ No    | Values: `parasmaipada`, `atmanepada`, `ubhayapada` |
| `standard_form`   | **Text (Short)**     | ❌ No    | सिद्धान्त रूप                                      |
| `past_imperfect`  | **Text (Short)**     | ❌ No    | लट् / Imperfect                                    |
| `potential`       | **Text (Short)**     | ❌ No    | लिङ् / Potencial                                   |
| `imperative`      | **Text (Short)**     | ❌ No    | लोट् / Imperativo                                  |
| `past_participle` | **Text (Short)**     | ❌ No    | क्त / Pasado Participio                            |
| `gerund`          | **Text (Short)**     | ❌ No    | क्त्वा / Gerundio                                  |
| `infinitive`      | **Text (Short)**     | ❌ No    | तुमुन् / Infinitivo                                |
| `ppp`             | **Text (Short)**     | ❌ No    | क्त / PPP                                          |

**Note:** Only populate for entries where `word_type` = `verb`

---

## Data Import Mapping

### From Substantivos Sheet (Sheet 1)

```
word_type = "substantive"
word_devanagari = Column A (सुबन्तं)
gender = Column B (लिङ्गं) → Convert:
  - पुं / पुंसक → "masculine"
  - स्त्री → "feminine"
  - नपुंसक → "neuter"
word_subtype =
  - if entry is an adjective → "adjective"
  - if entry is a pronoun → "pronoun"
  - otherwise → "noun"
meaning_es = Column C (अर्थ)
itrans = Column D (ITRANS)
iast = Column E (IATS)
harvard_kyoto = Column F (Harvard-Kyoto)
```

### From Indeclinables Sheet (Sheet 2)

```
word_type = "indeclinable"
word_devanagari = Column A (अव्यय)
meaning_es = Column B (अर्थ)
grammatical_case = Column C (विभक्ति)
itrans = Column D (ITRANS)
iast = Column E (IATS)
harvard_kyoto = Column F (Harvard-Kyoto)
```

### From Verbos Sheet (Sheet 3)

```
word_type = "verb"
word_devanagari = Column A (धातु)
root_devanagari = Column A (धातु)
verb_class = Column B (गण)
voice = Column C (पद) → Convert:
  - P → "parasmaipada"
  - A → "atmanepada"
  - U → "ubhayapada"
standard_form = Column D (सिद्धान्त रूप)
meaning_es = Column E (अर्थ)
past_imperfect = Column F (लट् / Imperfect ०)
potential = Column G (लिङ् / Potencial)
imperative = Column H (लोट् / Imperativo)
past_participle = Column I (क्त / Pasado Participio)
gerund = Column J (क्त्वा / Gerundio)
infinitive = Column K (तुमुन् / Infinitivo)
ppp = Column L (क्त / PPP)
itrans = Column M (ITRANS)
iast = Column N (IATS)
harvard_kyoto = Column O (Harvard-Kyoto)
```

---

## Quick Reference: Field Types Summary

**27 Total Fields:**

- **Text (Short)**: 17 fields
- **Text (Long)**: 4 fields (meaning_pt, meaning_es, meaning_en, notes)
- **Enumeration**: 4 fields (word_type, gender, voice, word_subtype)
- **Number (integer)**: 2 fields (order_index, verb_class)
- **Boolean**: 1 field (is_published)

---

## Validation Rules to Consider

After creating the content type, you may want to add these validations in your application logic:

1. **Substantives** must have either:
   - `word_subtype = adjective` or `pronoun` (gender optional), or
   - `word_subtype = noun` with `gender` populated
2. **Verbs** must have `verb_class` and `voice` populated
3. At least one translation field (`meaning_pt`, `meaning_es`, or `meaning_en`) should be filled
4. At least one transliteration scheme should be present

---

## Search Implementation Strategy

The vocabulary search uses **client-side filtering** for optimal performance and cost:

### How It Works:

1. **Single API call** - `getAllVocabulary()` fetches all entries on page load
2. **In-memory search** - JavaScript filters the data as you type
3. **No additional API costs** - All searches happen in the browser

### Why Client-Side?

- ✅ **Instant results** - No network delay
- ✅ **Cost-effective** - Only 1 API request per page visit
- ✅ **Works well** for datasets up to ~1000 entries
- ✅ **Better UX** - Real-time filtering as you type

### When to Consider Server-Side Search:

- Dataset grows beyond 1000+ entries
- Initial page load becomes slow (>2 seconds)
- Need advanced filtering (by lesson, date, etc.)

For now, client-side search is the best approach for your use case!
