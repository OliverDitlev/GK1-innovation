export const DEMO_PASSWORD = 'demo1234';

const DAY = 24 * 60 * 60 * 1000;
// indeholder alt stamdata for app ikke er helt tom
const COMPANIES = [
  { id: 'company-maersk', name: 'Maersk Technology', location: 'København' },
  { id: 'company-lunar', name: 'Lunar Bank', location: 'Aarhus' },
  { id: 'company-kromann', name: 'Kromann Reumert', location: 'København' },
  { id: 'company-siteimprove', name: 'Siteimprove', location: 'København' },
  { id: 'company-arla', name: 'Arla Foods', location: 'Viby J' },
  { id: 'company-vestas', name: 'Vestas Wind Systems', location: 'Aarhus' },
];

const JOBSEEKER = {
  id: 'user-demo-jobseeker',
  role: 'jobseeker',
  name: 'Demo Studerende',
  email: 'demo@jobify.dk',
  university: 'KU',
  education: 'Datalogi',
  about: '',
  savedJobIds: [],
};

const JOBS = [
  { id: 'job-1', companyId: 'company-maersk', title: 'Data Analyst — Praktik', edu: 'Datalogi & Software', location: 'København', type: 'Praktik', duration: '6 mdr.', desc: 'Analyser fragtruter og optimér processer for en af verdens største logistikoperationer.', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=300&h=200&fit=crop', daysAgo: 3 },
  { id: 'job-2', companyId: 'company-lunar', title: 'Junior UX Designer', edu: 'Design & Kommunikation', location: 'Aarhus', type: 'Studiejob', duration: '15 t/uge', desc: 'Prototyp nye brugerflows og deltag i brugertest med rigtige kunder hos en af Danmarks hurtigst voksende fintech-virksomheder.', image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=300&h=200&fit=crop', daysAgo: 7 },
  { id: 'job-3', companyId: 'company-kromann', title: 'Juridisk Praktikant', edu: 'Jura', location: 'København', type: 'Praktik', duration: '4 mdr.', desc: 'Arbejd med erhvervsret og M&A under vejledning af erfarne advokater i et af Nordens ledende advokatfirmaer.', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop', daysAgo: 5 },
  { id: 'job-4', companyId: 'company-siteimprove', title: 'Frontend Developer', edu: 'Datalogi & Software', location: 'København', type: 'Studiejob', duration: '20 t/uge', desc: 'Byg React-komponenter i en SaaS-platform brugt af 7.000+ virksomheder globalt.', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=200&fit=crop', daysAgo: 2 },
  { id: 'job-5', companyId: 'company-arla', title: 'Marketing Analytiker', edu: 'Økonomi & Erhverv', location: 'Viby J', type: 'Praktik', duration: '6 mdr.', desc: 'Analyser kampagneperformance og præsenter anbefalinger direkte for marketingdirektøren.', image: 'https://images.unsplash.com/photo-1611095564985-5d03d1d3a25e?w=300&h=200&fit=crop', daysAgo: 7 },
  { id: 'job-6', companyId: 'company-vestas', title: 'Konstruktionsingeniør', edu: 'Ingeniørvidenskab', location: 'Aarhus', type: 'Praktik', duration: '5 mdr.', desc: 'Deltag i udviklingen af næste generation vindmøllevinger med FEM-analyse og produktionsnær erfaring.', image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=300&h=200&fit=crop', daysAgo: 4 },
];

export function buildSeedData(now = Date.now()) {
  const companies = COMPANIES.map((c) => ({
    ...c,
    role: 'company',
    email: `${c.id.replace('company-', '')}@jobify.dk`,
    about: '',
    createdAt: now,
  }));

  const jobs = JOBS.map(({ daysAgo, ...job }) => ({
    ...job,
    university: '',
    createdAt: now - daysAgo * DAY,
  }));

  return {
    users: [{ ...JOBSEEKER, createdAt: now }, ...companies],
    jobs,
  };
}
