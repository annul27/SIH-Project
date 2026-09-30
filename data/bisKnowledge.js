// data/bisKnowledge.js
//
// PROTOTYPE KNOWLEDGE BASE.
// Every entry is a short, hand-written summary that the assistant is allowed to answer from.
// Before any real use, replace/extend these with text extracted from authorised BIS sources
// (bis.gov.in, Manak Online, the Indian Standards themselves) and verify every line.
//
// Fields:
//   id        - short unique key; the model cites these ids and the UI maps them back to title/ref
//   category  - standard | scheme | process | hallmark | consumer | lab | training | general
//   title     - shown to the user as the source name
//   ref       - where the user can verify it
//   content   - the facts the model may use

export const KNOWLEDGE_BASE = [
  {
    id: 'scheme-isi',
    category: 'scheme',
    title: 'Scheme-I: ISI Mark product certification',
    ref: 'BIS Conformity Assessment Regulations, 2018 (bis.gov.in)',
    content:
      'The ISI Mark is granted through a BIS licence under Scheme-I of the BIS Conformity Assessment Regulations, 2018. ' +
      'Typical route for a manufacturer: (1) identify the applicable Indian Standard (IS) for the product, ' +
      '(2) apply online on the Manak Online portal with the documents and fee, ' +
      '(3) BIS inspects the factory (process, in-house quality control lab, test equipment calibration), ' +
      '(4) samples are drawn and tested at a BIS-recognised laboratory, ' +
      '(5) BIS grants the licence, after which the ISI mark can be printed on the product. ' +
      'The licence is renewed periodically and BIS carries out surveillance inspections and market sample testing. ' +
      'Products covered by a Quality Control Order (QCO) must carry the ISI mark before sale, manufacture or import in India.',
  },
  {
    id: 'scheme-crs',
    category: 'scheme',
    title: 'Compulsory Registration Scheme (CRS)',
    ref: 'BIS CRS, Electronics & IT Goods Order (bis.gov.in)',
    content:
      'CRS applies to notified electronics and IT products (for example many adapters, chargers, power banks, LED products and IT equipment). ' +
      'Instead of a licence with factory-based surveillance, the manufacturer gets a Registration (R-number) after testing a sample at a BIS-recognised laboratory ' +
      'against the applicable Indian Standard, for example IS 13252 (Part 1) for safety of information technology equipment. ' +
      'The Standard Mark with the R-number must appear on the product. Applications are made through the BIS portal.',
  },
  {
    id: 'scheme-fmcs',
    category: 'scheme',
    title: 'Foreign Manufacturers Certification Scheme (FMCS)',
    ref: 'BIS Conformity Assessment Regulations, 2018 (bis.gov.in)',
    content:
      'FMCS lets a manufacturer located outside India obtain a BIS licence to use the ISI mark on goods exported to India. ' +
      'The process mirrors Scheme-I: application with documents and fee, BIS audit of the overseas factory, sample testing, then licence grant. ' +
      'Foreign manufacturers usually also appoint an Indian authorised representative. Marking fees and audit costs apply.',
  },
  {
    id: 'qco',
    category: 'process',
    title: 'Quality Control Orders (QCOs)',
    ref: 'Notifications of the concerned ministry/department (bis.gov.in lists them)',
    content:
      'A QCO is issued by the government department responsible for a sector and makes BIS certification mandatory for the listed products. ' +
      'Once a QCO is in force, it is not permitted to manufacture, import, sell or store the covered product without the required BIS mark. ' +
      'To check whether a product is covered, look at the QCO list on the BIS website using the product name, IS number or HS code.',
  },
  {
    id: 'find-standard',
    category: 'process',
    title: 'How to find the applicable Indian Standard for a product',
    ref: 'BIS Standards search / Manak Online',
    content:
      'Steps: (1) describe the product precisely, including material, intended use, and rating (voltage, capacity, etc.), ' +
      '(2) look up the product in the BIS standards catalogue or the QCO list to get the IS number, ' +
      '(3) check the HS code because customs and QCO lists often use it, ' +
      '(4) check whether the IS number has parts or amendments and use the latest version, ' +
      '(5) confirm whether certification is mandatory (QCO) or voluntary. ' +
      'When a product description is ambiguous, ask for the missing detail rather than guessing.',
  },
  {
    id: 'is-2347',
    category: 'standard',
    title: 'IS 2347: Domestic pressure cookers',
    ref: 'IS 2347 (bis.gov.in / BIS standards store)',
    content:
      'IS 2347 covers domestic pressure cookers. Certification is under Scheme-I (ISI mark). HS code commonly used: 7323.93. ' +
      'Typical test areas: bursting pressure, operating pressure and safety valve / pressure release performance, leakage after thermal shock or over-pressure, ' +
      'and material composition (food-grade stainless steel or aluminium). ' +
      'This summary is from the prototype data set. The exact clauses, limits and sampling plan must be read in the current IS 2347 text.',
  },
  {
    id: 'is-302-2-3',
    category: 'standard',
    title: 'IS 302 (Part 2/Sec 3): Electric irons',
    ref: 'IS 302 series, Safety of household and similar electrical appliances',
    content:
      'The IS 302 series covers safety of household and similar electrical appliances. Part 2, Section 3 gives particular requirements for electric irons. ' +
      'Certification is under Scheme-I (ISI mark). Typical concerns: protection against electric shock, temperature rise, leakage current, ' +
      'mechanical strength, and marking. Read the current standard text for exact limits.',
  },
  {
    id: 'is-1293',
    category: 'standard',
    title: 'IS 1293: Plugs and socket-outlets',
    ref: 'IS 1293 (bis.gov.in / BIS standards store)',
    content:
      'IS 1293 covers plugs and socket-outlets for household and similar use up to 250 V and up to 16 A. ' +
      'Certification is under Scheme-I (ISI mark). Typical concerns: dimensions and interchangeability, electric shock protection, ' +
      'temperature rise, mechanical strength, and marking. Read the current standard text for exact limits.',
  },
  {
    id: 'labs',
    category: 'lab',
    title: 'Laboratories for BIS testing',
    ref: 'BIS Laboratory recognition information (bis.gov.in)',
    content:
      'Test reports for BIS certification must come from a BIS-recognised laboratory. Recognised labs are generally NABL-accredited (ISO/IEC 17025) ' +
      'for the relevant IS and test parameters. Lab recognition is product- and test-specific, so a lab may be recognised for some standards and not others. ' +
      'To choose a lab: get the IS number, then check the BIS recognised-labs list filtered by that IS and by city, and confirm the lab scope with the lab directly. ' +
      'Manufacturers also need a calibrated in-house quality control lab for routine tests under Scheme-I. ' +
      'The assistant does not hold a live list of labs and must not invent lab names.',
  },
  {
    id: 'hallmark-basics',
    category: 'hallmark',
    title: 'BIS Hallmarking of gold jewellery',
    ref: 'IS 1417 and BIS Hallmarking scheme (bis.gov.in)',
    content:
      'Hallmarking certifies the purity of gold jewellery and artefacts. A BIS hallmark shows the BIS mark, the purity grade in carat and fineness (for example 22K916, 18K750, 14K585), ' +
      'and a 6-character alphanumeric HUID (Hallmark Unique ID). Jewellers must be BIS-registered and articles are tested at BIS-recognised Assaying and Hallmarking Centres. ' +
      'Consumers can verify a piece and its HUID with the BIS Care app. Purity grade indicates gold content, for example 22K916 means 91.6 percent gold.',
  },
  {
    id: 'hallmark-jeweller',
    category: 'hallmark',
    title: 'Becoming a BIS-registered jeweller / assaying centre',
    ref: 'BIS Hallmarking scheme (bis.gov.in)',
    content:
      'Jewellers register on the BIS portal to get a registration and send articles to a BIS-recognised Assaying and Hallmarking (A&H) centre for testing and marking. ' +
      'Centres are recognised by BIS after an assessment. Jewellers must keep records and sell only hallmarked articles of the notified categories.',
  },
  {
    id: 'consumer-check',
    category: 'consumer',
    title: 'Checking a product for genuine BIS marking',
    ref: 'BIS Care app (bis.gov.in)',
    content:
      'Look for the ISI mark with the IS number and licence number (CM/L number) on the product or packaging. ' +
      'For CRS products look for the Standard Mark with an R-number. The BIS Care app lets you check a licence or registration number and verify a hallmark HUID. ' +
      'A missing licence number, a misspelt mark or a mark that cannot be verified are warning signs.',
  },
  {
    id: 'consumer-complaint',
    category: 'consumer',
    title: 'Complaints about misuse of the ISI mark or poor quality',
    ref: 'BIS Care app / BIS complaint channels (bis.gov.in)',
    content:
      'Consumers can report a fake or misused ISI mark, a product that fails to meet the standard, an uncertified product that should be certified, ' +
      'or a hallmarking defect through the BIS Care app or the BIS complaint channels on bis.gov.in. Useful details to include: product name and brand, IS number, ' +
      'licence number if visible, photos of the marking and bill, shop name and location, and a short description of the problem. ' +
      'For a hallmark purity dispute, keep the HUID and the bill.',
  },
  {
    id: 'standards-clubs',
    category: 'training',
    title: 'Standards Clubs',
    ref: 'BIS Standards Club programme (bis.gov.in)',
    content:
      'Standards Clubs are set up in schools and colleges by BIS to build awareness of standardisation, quality and consumer rights among students. ' +
      'Institutions interested in starting one can apply through the BIS branch office nearest to them.',
  },
  {
    id: 'training',
    category: 'training',
    title: 'BIS training (NITS)',
    ref: 'National Institute of Training for Standardization, Noida (bis.gov.in)',
    content:
      'BIS runs training on standardisation, quality management and conformity assessment through its National Institute of Training for Standardization (NITS) in Noida. ' +
      'Courses are aimed at industry, laboratories, government and students. Check the BIS website for the current course calendar and fees.',
  },
  {
    id: 'buy-standards',
    category: 'general',
    title: 'Getting a copy of an Indian Standard',
    ref: 'BIS standards store / Manak Online (bis.gov.in)',
    content:
      'Full Indian Standard documents are available from the BIS standards store and through BIS portals. Some standards can be viewed online for free in read-only mode; ' +
      'purchase is needed for downloadable copies. Always work from the latest version and check for amendments.',
  },
];

export const KB_BY_ID = Object.fromEntries(KNOWLEDGE_BASE.map((d) => [d.id, d]));