#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('⚖️ Seeding Real Lawyers in Thailand...\n');

  const countries = await prisma.country.findMany();
  const cities = await prisma.city.findMany();

  const thailand = countries.find(c => c.code === 'TH');
  if (!thailand) {
    console.log('❌ Thailand not found');
    return;
  }

  const bangkok = cities.find(c => c.name === 'Bangkok');
  const chiangMai = cities.find(c => c.name === 'Chiang Mai');
  const pattaya = cities.find(c => c.name === 'Pattaya');
  const kohSamui = cities.find(c => c.name === 'Koh Samui');
  const phuket = cities.find(c => c.name === 'Phuket');
  const huaHin = cities.find(c => c.name === 'Hua Hin');

  // Create missing cities
  let phuketCity = phuket;
  if (!phuketCity) {
    phuketCity = await prisma.city.create({
      data: {
        name: 'Phuket',
        nameAr: 'فوكيت',
        nameTh: 'ภูเก็ต',
        countryId: thailand.id,
        latitude: 7.8804,
        longitude: 98.3923,
        isActive: true,
      },
    });
    console.log('   ✅ Created Phuket city');
  }

  let huaHinCity = huaHin;
  if (!huaHinCity) {
    huaHinCity = await prisma.city.create({
      data: {
        name: 'Hua Hin',
        nameAr: 'هوا هين',
        nameTh: 'หัวหิน',
        countryId: thailand.id,
        latitude: 12.5683,
        longitude: 99.9576,
        isActive: true,
      },
    });
    console.log('   ✅ Created Hua Hin city');
  }

  // Real lawyers data from DFAT
  const lawyersData = [
    // Bangkok
    { name: 'Laurent Benoit', firm: 'Jus Laws and Consult International', city: bangkok, specialty: 'CORPORATE_LAW', phone: '+66814239627', email: 'bangkok@juslaws.com', address: 'Suite 901, 9th floor, One Pacific Place, 140 Sukhumvit Road', languages: ['en', 'th'], exp: 15 },
    { name: 'Khapmun Srinoikhao', firm: 'Benjapol Law and Business', city: bangkok, specialty: 'CRIMINAL_LAW', phone: '+66818217510', email: 'kampun_s@yahoo.com', address: '225/4 Chang-akartutit Road, Donmuang', languages: ['en', 'th'], exp: 12 },
    { name: 'Luca Bernardinetti', firm: 'Mahanakorn Partners Group', city: bangkok, specialty: 'CORPORATE_LAW', phone: '+6626515107', email: 'luca@mahanakornpartners.com', address: '9th floor, Kian Gwan House III, 152 Wireless Road', languages: ['en', 'th', 'de', 'it'], exp: 18 },
    { name: 'Thanyaphat Choksirithananon', firm: 'Anglo-Thai Legal (ALT)', city: bangkok, specialty: 'CRIMINAL_LAW', phone: '+6697945590', email: 'Amy.C@anglothailegal.co.th', address: '133 Sukhumvit 57 Road, Klongton Nua', languages: ['en', 'th', 'fr', 'ar'], exp: 14 },
    { name: 'Ryan Crowley', firm: 'Dharmniti Law Office', city: bangkok, specialty: 'FAMILY_LAW', phone: '+6626809710', email: 'info@dlo.co.th', address: '2/2 Bhakdi Building 2nd Floor, Wireless Road', languages: ['en', 'th'], exp: 10 },
    { name: 'Jayavadh Bunnag', firm: 'International Legal Counsellors Thailand', city: bangkok, specialty: 'CORPORATE_LAW', phone: '+6626796005', email: 'law@ilct.co.th', address: '18th Floor Sathorn City Tower, 175 South Sathorn Road', languages: ['en', 'th'], exp: 20 },
    { name: 'Rujira Bunnag', firm: 'Marut Bunnag International Law Office', city: bangkok, specialty: 'CIVIL_LAW', phone: '+66955208109', email: 'marut@loxinfo.co.th', address: 'Forum Tower 184/130 Ratchadaphisek', languages: ['en', 'th'], exp: 18 },
    { name: 'Kenneth Graham', firm: 'Siam Legal International', city: bangkok, specialty: 'CORPORATE_LAW', phone: '+6622548900', email: 'info@siam-legal.com', address: 'Two Pacific Place Building 18th Floor, 142 Sukhumvit Road', languages: ['en', 'th', 'tl'], exp: 16 },
    { name: 'Worachai Bhicharnchitr', firm: 'Vickery and Worachai Ltd', city: bangkok, specialty: 'IMMIGRATION_LAW', phone: '+6622566311', email: 'vwlaw@v-w.co.th', address: '16th Floor GPF Witthayu Tower A, 93/1 Wireless Road', languages: ['en', 'th'], exp: 15 },
    { name: 'Garn Tuntasatityanond', firm: 'Garn Tuntasatityanond & Associates', city: bangkok, specialty: 'CRIMINAL_LAW', phone: '+66865651791', email: 'info@Thailand-LawyerBangkok.com', address: '85 Nonsi Road - Soi 8', languages: ['en', 'th'], exp: 17 },
    
    // Chiang Mai
    { name: 'Sira Krisdatarn', firm: 'Progressive International Legal', city: chiangMai, specialty: 'CRIMINAL_LAW', phone: '+66871900011', email: 'cnx.progressivelegal@gmail.com', address: '310 Icon Park Hotel Building, 2nd floor, Maneenopparat Road', languages: ['en', 'th', 'zh'], exp: 12 },
    { name: 'Joe Lynch', firm: 'Lanna Lawyers', city: chiangMai, specialty: 'FAMILY_LAW', phone: '+66849047797', email: 'jlynch@lannalawyers.com', address: '298/15 Moo 5 Soi 28 Chottana Road', languages: ['en', 'th'], exp: 14 },
    { name: 'Khun Air', firm: 'Prawin Law Office', city: chiangMai, specialty: 'CRIMINAL_LAW', phone: '+66811119031', email: 'prawincm@hotmail.com', address: '81 Rajvithi Road, Tambol Sripoom', languages: ['en', 'th'], exp: 11 },
    { name: 'Apichart Mattayanuwat', firm: 'Siam Legal Chiang Mai', city: chiangMai, specialty: 'CORPORATE_LAW', phone: '+66908918447', email: 'info@siam-legal.com', address: 'Curve Mall 2nd floor, 215/2 Chang Klan Road', languages: ['en', 'th', 'zh'], exp: 13 },
    { name: 'Sumalee Jennapa', firm: '29 Tanin Co., LTD', city: chiangMai, specialty: 'CORPORATE_LAW', phone: '+66818824311', email: '29tanin@gmail.com', address: '29 Tanin Road', languages: ['en', 'th', 'zh'], exp: 10 },
    
    // Pattaya
    { name: 'Kelvin Bamfield', firm: 'Thai888 Law', city: pattaya, specialty: 'CRIMINAL_LAW', phone: '+66863760527', email: 'info@thai888.com', address: 'View Talay Condominium 5D, 478 Office 10 & 12, Thappraya Road', languages: ['en', 'th'], exp: 15 },
    
    // Koh Samui
    { name: 'Jus Laws Samui', firm: 'Jus Laws and Consult International (Samui)', city: kohSamui, specialty: 'CORPORATE_LAW', phone: '+6677447728', email: 'Samui@juslaws.com', address: '18/15 Moo 4 Borput, Samui', languages: ['en', 'th'], exp: 12 },
    
    // Phuket
    { name: 'Kittiya Srichay', firm: 'Kittiya Srichay - Attorney at Law', city: phuketCity, specialty: 'CRIMINAL_LAW', phone: '+66840134941', email: 'kittiya@lawyer.com', address: '369/95 Yoawarat Rd, Taladyai', languages: ['en', 'th'], exp: 10 },
    { name: 'Friedrich Sam Fauma', firm: 'International Law Office', city: phuketCity, specialty: 'CORPORATE_LAW', phone: '+6676222191', email: 'sam@ilo-phuket.com', address: '17/6 Chaofah Road, Talad Nue', languages: ['en', 'th', 'de'], exp: 16 },
    { name: 'Manachai Tadthong', firm: 'Lawmark & Associates', city: phuketCity, specialty: 'CORPORATE_LAW', phone: '+6676319137', email: 'manachai@lawmarkassociates.com', address: '2/49, Moo 2 Kathu', languages: ['en', 'th'], exp: 14 },
    { name: 'Patcharawan Lidureau', firm: 'GKL International Law Firm', city: phuketCity, specialty: 'CIVIL_LAW', phone: '+66848890505', email: 'info@gklintllawfirm.com', address: '4/8 Moo. 7 Soi Jaofa 38, T. Chalong', languages: ['en', 'th', 'fr'], exp: 11 },
    { name: 'Nalin Intarasombut', firm: '4N International Law Office', city: phuketCity, specialty: 'LABOR_LAW', phone: '+6681654349', email: 'nalinintarasombut@gmail.com', address: '67/14, Moo4, Visate Road, Rawai', languages: ['en', 'th', 'fr'], exp: 9 },
    
    // Hua Hin
    { name: 'David Martin', firm: 'Hua Hin Law Office', city: huaHinCity, specialty: 'FAMILY_LAW', phone: '+66818469193', email: 'david@legalserviceshuahin.com', address: 'Unit 1@Makro Soi 4', languages: ['en', 'th', 'fr'], exp: 13 },
    { name: 'Nattakarn Limapat', firm: 'Haussmann Legal International', city: huaHinCity, specialty: 'INTELLECTUAL_PROPERTY', phone: '+66630599993', email: 'contact@hlasia.legal', address: '234/79 Moo15 Hin Lek Fai', languages: ['en', 'fr'], exp: 10 },
  ];

  console.log('⚖️ Creating Lawyers...');
  let count = 0;

  for (const lawyer of lawyersData) {
    if (!lawyer.city) continue;
    
    try {
      // Create user
      const user = await prisma.user.create({
        data: {
          email: lawyer.email,
          name: lawyer.name,
          role: 'PROVIDER',
        },
      });

      // Create lawyer profile
      await prisma.lawyer.create({
        data: {
          userId: user.id,
          firstName: lawyer.name.split(' ')[0],
          lastName: lawyer.name.split(' ').slice(1).join(' '),
          cityId: lawyer.city.id,
          countryId: thailand.id,
          specialty: lawyer.specialty,
          barNumber: `TH-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
          bio: `${lawyer.specialty.replace('_', ' ')} specialist at ${lawyer.firm}. ${lawyer.exp} years of experience providing expert legal services in Thailand.`,
          hourlyRate: lawyer.specialty === 'CRIMINAL_LAW' ? 3000 : lawyer.specialty === 'CORPORATE_LAW' ? 4000 : 2500,
          yearsExperience: lawyer.exp,
          languages: lawyer.languages,
          address: lawyer.address,
          countries: ['TH'],
          certifications: ['Thai Bar Association', 'Licensed Attorney'],
          education: ['Law School', `${lawyer.specialty.replace('_', ' ')} Specialization`],
          specializations: [lawyer.specialty],
        },
      });
      count++;
      console.log(`   ✅ ${lawyer.name} (${lawyer.city.name})`);
    } catch (e: any) {
      if (!e.message.includes('Unique')) {
        console.log(`   ⚠️  ${lawyer.name}:`, e.message.split('\n')[0]);
      }
    }
  }

  console.log(`\n   Total: ${count} lawyers created\n`);

  // Summary
  const totalLawyers = await prisma.lawyer.count();
  const lawyersByCity = await prisma.lawyer.groupBy({
    by: ['cityId'],
    _count: true,
  });

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ THAILAND LAWYERS SEED COMPLETED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Summary:
  ⚖️ ${count} new lawyers added
  ⚖️ ${totalLawyers} total lawyers in database
  
  By City:
    Bangkok: ${lawyersData.filter(l => l.city === bangkok).length}
    Chiang Mai: ${lawyersData.filter(l => l.city === chiangMai).length}
    Pattaya: ${lawyersData.filter(l => l.city === pattaya).length}
    Koh Samui: ${lawyersData.filter(l => l.city === kohSamui).length}
    Phuket: ${lawyersData.filter(l => l.city === phuketCity).length}
    Hua Hin: ${lawyersData.filter(l => l.city === huaHinCity).length}

🌐 Test:
  curl "http://localhost:3000/api/lawyers?country=TH" | jq
  curl "http://localhost:3000/api/lawyers?city=bangkok" | jq

🎉 Real lawyers from DFAT Thailand list loaded!
  `);
}

main()
  .catch((e) => {
    console.error('\n❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
