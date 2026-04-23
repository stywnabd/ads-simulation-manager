import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight, Play, Target, Users, Image as ImageIcon,
  TrendingUp, CheckCircle2, XCircle, Lock,
  Facebook, Instagram, MessageCircle, ShoppingBag, Clock,
  Layers, Megaphone, Briefcase, Star, ArrowLeft, RotateCcw,
  BarChart3, MousePointer2, DollarSign, Eye, Zap, Info
} from 'lucide-react';

// ============================================================
// SCENARIO DATA — 5 brief klien untuk MVP
// ============================================================
const SCENARIOS = [
  {
    id: 1,
    client: 'Bakery Roti Kita',
    avatar: 'BR',
    avatarColor: 'bg-amber-100 text-amber-800',
    level: 'Pemula',
    levelNum: 1,
    niche: 'E-commerce · Kuliner',
    brief: 'Halo! Saya baru buka toko online kue homemade. Produk andalan kami roti manis, brownies, dan muffin. Pengiriman area Jabodetabek via kurir instant. Mau coba iklan Meta buat boost penjualan langsung dari website. Target saya ibu-ibu muda yang suka cemilan sore.',
    budget: 2000000,
    duration: 7,
    aov: 150000,
    targetOrders: 30,
    targetROAS: 2.0,
    kpi: 'ROAS ≥ 2.0x',
    ideal: {
      objective: 'sales',
      ageMin: 25, ageMax: 45,
      gender: 'female',
      location: 'jakarta',
      interests: ['kuliner', 'masak'],
      placements: ['feed', 'stories'],
      creative: 'product_photo',
      destination: 'website',
      cta: 'shop_now'
    },
    lessons: {
      objective: 'Untuk e-commerce yang bisa langsung dibeli online, "Sales" paling tepat. "Leads" cocok untuk produk yang butuh konsultasi dulu.',
      audience: 'Kue cemilan sore paling relevan untuk wanita 25-45 (ibu-ibu muda). Umur terlalu muda (<20) daya belinya kurang; terlalu tua (>50) biasanya bikin sendiri.',
      creative: 'Foto produk yang menggugah (appetite appeal) paling converting untuk F&B. Testimoni atau demo kurang efektif untuk impulse purchase seperti cemilan.',
      destination: 'Karena produk sudah ada website checkout, langsung kirim ke website untuk cut friksi. WA cocok kalau produknya butuh konsultasi atau custom.'
    }
  },
  {
    id: 2,
    client: 'Bimbel Sinar Ilmu',
    avatar: 'BS',
    avatarColor: 'bg-teal-100 text-teal-800',
    level: 'Pemula',
    levelNum: 2,
    niche: 'Edukasi · Bimbingan Belajar',
    brief: 'Halo, saya butuh bantuan. Bimbel kami mau narik siswa SMP untuk program persiapan masuk SMA favorit di Jakarta Timur. Kelas baru mulai 2 minggu lagi. Paketnya 1.5 juta untuk 3 bulan. Orang tua biasanya mau konsultasi dulu sebelum daftar, jadi kami ada admin WhatsApp yang standby.',
    budget: 3000000,
    duration: 7,
    aov: 1500000,
    targetOrders: 30,
    targetROAS: 3.0,
    kpi: 'CPL ≤ Rp100k & ROAS ≥ 3x',
    ideal: {
      objective: 'leads',
      ageMin: 35, ageMax: 55,
      gender: 'all',
      location: 'jakarta_timur',
      interests: ['parenting', 'pendidikan'],
      placements: ['feed'],
      creative: 'testimoni',
      destination: 'whatsapp',
      cta: 'learn_more'
    },
    lessons: {
      objective: 'Harga 1.5 juta adalah "high-consideration purchase" — orang tua tidak akan langsung transfer. Pakai "Leads" untuk kumpulkan kontak dulu, closing via WhatsApp.',
      audience: 'Siswa SMP tidak pegang HP sendiri untuk transaksi. Yang harus dijangkau adalah ORANG TUA (umur 35-55). Jangan targetkan usia anak.',
      creative: 'Testimoni "anak saya diterima di SMAN 8" lebih powerful daripada foto produk untuk bisnis edukasi. Orang tua butuh bukti sosial.',
      destination: 'Kirim ke WhatsApp. Landing page konversinya jauh lebih rendah untuk jasa edukasi karena orang tua perlu tanya-tanya dulu.',
      location: 'Bimbel lokal Jakarta Timur — jangan buang budget ke luar area. Targeting geografis ketat menghemat 40% budget.'
    }
  },
  {
    id: 3,
    client: 'Servis AC Dingin',
    avatar: 'AC',
    avatarColor: 'bg-blue-100 text-blue-800',
    level: 'Pemula',
    levelNum: 3,
    niche: 'Local Service · Home Service',
    brief: 'Mas, saya punya usaha jasa servis AC rumahan. Cuci AC 100rb, perbaikan mulai 200rb. Musim panas ini banyak order tapi saya mau scale lebih. Tim saya 3 teknisi, area layanan Jakarta + Tangerang. Biasanya customer chat dulu nanya harga baru booking.',
    budget: 1500000,
    duration: 7,
    aov: 200000,
    targetOrders: 40,
    targetROAS: 5.0,
    kpi: 'CPL ≤ Rp40k',
    ideal: {
      objective: 'leads',
      ageMin: 28, ageMax: 55,
      gender: 'all',
      location: 'jakarta',
      interests: ['rumah_tangga'],
      placements: ['feed', 'stories'],
      creative: 'promo_harga',
      destination: 'whatsapp',
      cta: 'send_message'
    },
    lessons: {
      objective: 'Jasa servis = perlu tanya dulu (alamat, jenis AC, jadwal). "Leads" atau "Messages" paling efektif.',
      audience: 'Pemilik rumah/apartment dengan AC umumnya 28-55. Di bawah itu biasanya masih tinggal dengan orang tua atau kos yang AC-nya tanggung jawab pemilik kos.',
      creative: 'Untuk jasa murah, promo harga eksplisit ("Cuci AC 80rb, hemat 20rb") langsung memicu action. Testimoni kurang urgent untuk jasa impulse.',
      destination: 'WhatsApp wajib — customer perlu kirim alamat dan foto AC dulu.'
    }
  },
  {
    id: 4,
    client: 'Modiska Hijab',
    avatar: 'MH',
    avatarColor: 'bg-pink-100 text-pink-800',
    level: 'Menengah',
    levelNum: 4,
    niche: 'E-commerce · Fashion',
    brief: 'Hi, brand hijab kami lagi scaling. Produk dari hijab pashmina sampai gamis, harga 150-400k. Jualan di website sendiri dan Shopee. Kami udah ada 10k follower IG, tapi mau ambil audience baru lewat iklan. Budget 5 juta untuk 10 hari, target minimal 3x ROAS. Creative kami ada lookbook video dan foto model.',
    budget: 5000000,
    duration: 10,
    aov: 250000,
    targetOrders: 100,
    targetROAS: 3.0,
    kpi: 'ROAS ≥ 3x',
    ideal: {
      objective: 'sales',
      ageMin: 20, ageMax: 35,
      gender: 'female',
      location: 'indonesia',
      interests: ['fashion', 'hijab'],
      placements: ['reels', 'feed', 'stories'],
      creative: 'lookbook',
      destination: 'website',
      cta: 'shop_now'
    },
    lessons: {
      objective: 'Brand fashion dengan website checkout → "Sales" optimal. Sistem Meta akan cari pembeli serupa dengan pembeli sebelumnya.',
      audience: 'Muslimah usia 20-35 adalah sweet spot fashion hijab modern. Di atas 40 seleranya berbeda (lebih formal/klasik).',
      creative: 'Lookbook/model wearing product di Reels format vertical paling powerful untuk fashion 2025. Demo "ini dia produknya" statis sudah outdated.',
      placements: 'Reels wajib untuk fashion — ini tempat orang browse ide outfit. Feed & Stories untuk reinforcement.'
    }
  },
  {
    id: 5,
    client: 'Klinik Gigi SenyumSehat',
    avatar: 'SS',
    avatarColor: 'bg-purple-100 text-purple-800',
    level: 'Menengah',
    levelNum: 5,
    niche: 'Medical · Dental',
    brief: 'Hi, klinik gigi kami di Jakarta Selatan mau narik pasien baru untuk layanan scaling, bleaching, dan behel. Harga rata-rata per treatment 1 juta. Kompetitor banyak, tapi kami punya keunggulan dokter spesialis dan alat modern. Pasien selalu booking via WA dulu buat jadwal.',
    budget: 4000000,
    duration: 14,
    aov: 1000000,
    targetOrders: 25,
    targetROAS: 2.5,
    kpi: 'ROAS ≥ 2.5x',
    ideal: {
      objective: 'leads',
      ageMin: 28, ageMax: 50,
      gender: 'all',
      location: 'jakarta_selatan',
      interests: ['kesehatan', 'kecantikan'],
      placements: ['feed', 'stories'],
      creative: 'before_after',
      destination: 'whatsapp',
      cta: 'book_now'
    },
    lessons: {
      objective: 'Medical treatment butuh konsultasi, cek jadwal dokter, dsb. "Leads" dengan follow-up WA wajib.',
      audience: 'Segmen 28-50 punya disposable income untuk perawatan estetik gigi. Di bawah 25 biasanya masih dibiayai orang tua.',
      creative: 'Before-after adalah "bukti visual" paling kuat untuk medical/beauty. Testimoni ok tapi kurang impactful dibanding hasil langsung.',
      location: 'Klinik fisik di Jakarta Selatan — targetkan radius 10-15km. Jangan buang budget ke kota lain.'
    }
  }
];

// ============================================================
// FORM OPTIONS
// ============================================================
const OBJECTIVES = [
  { value: 'awareness', label: 'Awareness', desc: 'Tingkatkan brand recognition' },
  { value: 'traffic', label: 'Traffic', desc: 'Arahkan orang ke website' },
  { value: 'engagement', label: 'Engagement', desc: 'Dapatkan likes, komen, share' },
  { value: 'leads', label: 'Leads', desc: 'Kumpulkan kontak calon pembeli' },
  { value: 'sales', label: 'Sales', desc: 'Optimasi untuk transaksi' },
  { value: 'app_install', label: 'App Installs', desc: 'Orang install aplikasi' }
];

const LOCATIONS = [
  { value: 'indonesia', label: 'Seluruh Indonesia' },
  { value: 'jakarta', label: 'Jakarta (Greater)' },
  { value: 'jakarta_selatan', label: 'Jakarta Selatan' },
  { value: 'jakarta_timur', label: 'Jakarta Timur' },
  { value: 'jabodetabek', label: 'Jabodetabek' },
  { value: 'bandung', label: 'Bandung' }
];

const INTERESTS = [
  { value: 'kuliner', label: 'Kuliner & Makanan' },
  { value: 'masak', label: 'Memasak' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'hijab', label: 'Hijab & Muslim Fashion' },
  { value: 'parenting', label: 'Parenting' },
  { value: 'pendidikan', label: 'Pendidikan' },
  { value: 'rumah_tangga', label: 'Rumah Tangga' },
  { value: 'kesehatan', label: 'Kesehatan' },
  { value: 'kecantikan', label: 'Kecantikan' },
  { value: 'olahraga', label: 'Olahraga' },
  { value: 'teknologi', label: 'Teknologi' },
  { value: 'otomotif', label: 'Otomotif' }
];

const PLACEMENTS = [
  { value: 'feed', label: 'Feed (FB & IG)', icon: Facebook },
  { value: 'stories', label: 'Stories', icon: Instagram },
  { value: 'reels', label: 'Reels', icon: Play },
  { value: 'audience_network', label: 'Audience Network', icon: Layers }
];

const CREATIVES = [
  { value: 'product_photo', label: 'Foto Produk', desc: 'Close-up produk yang menggugah' },
  { value: 'testimoni', label: 'Testimoni Customer', desc: 'Cerita pengalaman pengguna' },
  { value: 'demo', label: 'Demo / How-it-works', desc: 'Tutorial atau cara pakai' },
  { value: 'promo_harga', label: 'Promo Harga', desc: 'Diskon eksplisit di creative' },
  { value: 'lookbook', label: 'Lookbook / Lifestyle', desc: 'Model memakai produk, reels' },
  { value: 'before_after', label: 'Before-After', desc: 'Hasil sebelum & sesudah' },
  { value: 'authority', label: 'Authority / Expert', desc: 'Tokoh ahli menjelaskan' }
];

const DESTINATIONS = [
  { value: 'website', label: 'Website', icon: ShoppingBag },
  { value: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { value: 'messenger', label: 'Messenger', icon: MessageCircle },
  { value: 'instagram_dm', label: 'Instagram DM', icon: Instagram },
  { value: 'instant_form', label: 'Instant Form', icon: Layers }
];

const CTAS = [
  { value: 'shop_now', label: 'Shop Now' },
  { value: 'learn_more', label: 'Learn More' },
  { value: 'send_message', label: 'Send Message' },
  { value: 'book_now', label: 'Book Now' },
  { value: 'sign_up', label: 'Sign Up' },
  { value: 'get_offer', label: 'Get Offer' }
];

// ============================================================
// SIMULATION ENGINE
// ============================================================
function simulate(scenario, config) {
  const ideal = scenario.ideal;

  // Helper: range overlap 0-1
  const overlap = (a1, a2, b1, b2) => {
    const lo = Math.max(a1, b1);
    const hi = Math.min(a2, b2);
    if (hi <= lo) return 0;
    const idealSpan = b2 - b1;
    const matchSpan = hi - lo;
    const pemainSpan = a2 - a1;
    const coverage = matchSpan / idealSpan;
    const precision = matchSpan / Math.max(pemainSpan, 1);
    return Math.min(1, (coverage * 0.6 + precision * 0.4));
  };

  // Match scores
  const objectiveMatch = config.objective === ideal.objective ? 1 :
    (config.objective === 'traffic' && ideal.objective === 'sales') ? 0.5 :
    (config.objective === 'engagement' && ideal.objective === 'leads') ? 0.4 : 0.25;

  const ageMatch = overlap(config.ageMin, config.ageMax, ideal.ageMin, ideal.ageMax);
  const genderMatch = (config.gender === ideal.gender || ideal.gender === 'all') ? 1 :
    (config.gender === 'all' ? 0.7 : 0.3);
  const locationMatch = config.location === ideal.location ? 1 :
    (config.location === 'indonesia' ? 0.5 : 0.25);

  const idealInt = ideal.interests;
  const pickedInt = config.interests || [];
  const matchedInt = pickedInt.filter(i => idealInt.includes(i)).length;
  const interestMatch = idealInt.length === 0 ? 0.5 :
    (matchedInt === 0 ? 0.3 : (matchedInt / idealInt.length) * (idealInt.length / Math.max(pickedInt.length, 1)) * 1.2);

  const placementMatch = (() => {
    const ideal_p = ideal.placements;
    const picked_p = config.placements || [];
    if (picked_p.length === 0) return 0.3;
    const matched = picked_p.filter(p => ideal_p.includes(p)).length;
    return Math.min(1, matched / ideal_p.length * 0.7 + (picked_p.length >= ideal_p.length ? 0.3 : 0));
  })();

  const creativeMatch = config.creative === ideal.creative ? 1 : 0.35;
  const destinationMatch = config.destination === ideal.destination ? 1 :
    ((config.destination === 'whatsapp' && ideal.destination === 'instagram_dm') ||
     (config.destination === 'messenger' && ideal.destination === 'whatsapp')) ? 0.75 : 0.3;

  // Composite scores
  const audienceScore = Math.min(1, ageMatch * 0.4 + genderMatch * 0.2 + locationMatch * 0.2 + Math.min(interestMatch, 1) * 0.2);
  const funnelScore = objectiveMatch * 0.5 + destinationMatch * 0.5;

  // Base metrics
  const baseCTR = 0.018;
  const baseCPM = 28000;

  // Noise
  const noise = () => 0.85 + Math.random() * 0.30;

  // Calculated rates
  const actualCTR = baseCTR * (audienceScore * 0.4 + creativeMatch * 0.6) * noise();
  const actualCPM = baseCPM * (1 + (1 - audienceScore) * 0.8 + (1 - placementMatch) * 0.3) * noise();
  const baseCR = scenario.aov <= 300000 ? 0.035 : scenario.aov <= 1000000 ? 0.025 : 0.018;
  const actualCR = baseCR * funnelScore * (audienceScore * 0.5 + 0.5) * noise();

  // Results
  const impressions = Math.round((config.budget / actualCPM) * 1000);
  const reach = Math.round(impressions * (0.55 + Math.random() * 0.15));
  const clicks = Math.round(impressions * actualCTR);
  const conversions = Math.max(0, Math.round(clicks * actualCR));
  const revenue = conversions * scenario.aov;
  const cpl = conversions > 0 ? Math.round(config.budget / conversions) : 0;
  const cpc = clicks > 0 ? Math.round(config.budget / clicks) : 0;
  const roas = revenue / config.budget;

  // Daily breakdown for animation
  const dailyBreakdown = [];
  const days = scenario.duration;
  for (let d = 0; d < days; d++) {
    const dayFactor = (0.8 + Math.random() * 0.4) / days;
    dailyBreakdown.push({
      day: d + 1,
      impressions: Math.round(impressions * dayFactor),
      clicks: Math.round(clicks * dayFactor),
      conversions: Math.round(conversions * dayFactor)
    });
  }

  return {
    spent: config.budget,
    impressions, reach, clicks, conversions, revenue,
    ctr: actualCTR, cpm: actualCPM, cpc, cpl, roas,
    scores: {
      objective: objectiveMatch,
      audience: audienceScore,
      age: ageMatch,
      gender: genderMatch,
      location: locationMatch,
      interests: Math.min(1, interestMatch),
      placement: placementMatch,
      creative: creativeMatch,
      destination: destinationMatch
    },
    dailyBreakdown
  };
}

// ============================================================
// BOS REACTIONS
// ============================================================
function getBosReaction(roas, targetROAS, budget) {
  if (roas >= targetROAS * 1.3) return {
    mood: 'happy',
    emoji: '😄',
    color: 'bg-green-50 border-green-200 text-green-900',
    message: `Wih mantap banget! ROAS ${roas.toFixed(2)}x, jauh di atas target. Klien bakal senang, gue bakal kasih lo klien yang lebih gede minggu depan. Lanjutin kerja begini!`,
    title: 'Bos pegang pundak lo'
  };
  if (roas >= targetROAS) return {
    mood: 'satisfied',
    emoji: '🙂',
    color: 'bg-blue-50 border-blue-200 text-blue-900',
    message: `Oke, target tercapai. ROAS ${roas.toFixed(2)}x, tipis tapi lewat. Gue ekspek next campaign bisa lebih solid. Ayo kita tingkatin.`,
    title: 'Bos ngangguk'
  };
  if (roas >= targetROAS * 0.6) return {
    mood: 'worried',
    emoji: '😐',
    color: 'bg-amber-50 border-amber-200 text-amber-900',
    message: `Hmm... ROAS cuma ${roas.toFixed(2)}x, di bawah target ${targetROAS}x. Klien nanya-nanya nih. Baca lagi brief-nya, pasti ada yang kelewat. Next campaign harus lebih baik.`,
    title: 'Bos nepuk meja'
  };
  return {
    mood: 'angry',
    emoji: '😠',
    color: 'bg-red-50 border-red-200 text-red-900',
    message: `Ini parah sih. ROAS ${roas.toFixed(2)}x? Budget Rp${budget.toLocaleString('id-ID')} kepake buat apa? Besok pagi 8 gue mau liat lo presentasi kenapa ini jeblok. Satu kali lagi kayak gini, kontrak lo gue review.`,
    title: 'Bos ngomel'
  };
}

// ============================================================
// UTILITY COMPONENTS
// ============================================================
const Pill = ({ children, color = 'gray' }) => {
  const colors = {
    gray: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    amber: 'bg-amber-100 text-amber-800',
    red: 'bg-red-100 text-red-800'
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors[color]}`}>{children}</span>;
};

const MetricCard = ({ label, value, sub, icon: Icon }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-3">
    <div className="flex items-center gap-1.5 mb-1">
      {Icon && <Icon className="w-3.5 h-3.5 text-gray-500" />}
      <span className="text-xs text-gray-500">{label}</span>
    </div>
    <div className="text-lg font-semibold text-gray-900">{value}</div>
    {sub && <div className="text-xs text-gray-500 mt-0.5">{sub}</div>}
  </div>
);

const formatRupiah = (n) => 'Rp' + Math.round(n).toLocaleString('id-ID');
const formatNumber = (n) => Math.round(n).toLocaleString('id-ID');

// ============================================================
// SCREEN: HOME
// ============================================================
function HomeScreen({ scenarios, progress, onSelect }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium mb-4">
            <Zap className="w-3.5 h-3.5" /> MVP · v0.1
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ads Manager Simulator</h1>
          <p className="text-lg text-gray-600">Rasakan jadi Junior Media Buyer. Kelola campaign Meta Ads untuk klien real-world. Hadapi bos kalau ROAS jeblok.</p>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{progress.completed.length}<span className="text-sm text-gray-400">/{scenarios.length}</span></div>
            <div className="text-xs text-gray-500 mt-1">Campaign selesai</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{progress.totalStars}<span className="text-sm text-gray-400">/15</span></div>
            <div className="text-xs text-gray-500 mt-1">Bintang terkumpul</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{progress.bosApproval}%</div>
            <div className="text-xs text-gray-500 mt-1">Kepuasan bos</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{progress.rank}</div>
            <div className="text-xs text-gray-500 mt-1">Jabatan</div>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Daftar klien</h2>
          <span className="text-sm text-gray-500">Pilih brief untuk mulai campaign</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map((s) => {
            const done = progress.completed.find(c => c.id === s.id);
            const locked = s.levelNum > 1 && !progress.completed.find(c => c.id === s.levelNum - 1) && progress.completed.length === 0;
            return (
              <button
                key={s.id}
                disabled={locked}
                onClick={() => !locked && onSelect(s)}
                className={`text-left bg-white border rounded-lg p-5 transition-all ${
                  locked ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-400 hover:shadow-sm cursor-pointer border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 ${s.avatarColor}`}>
                    {s.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{s.client}</h3>
                      {done && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                      {locked && <Lock className="w-4 h-4 text-gray-400" />}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{s.niche}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <Pill color={s.levelNum <= 3 ? 'green' : 'amber'}>Level {s.levelNum} · {s.level}</Pill>
                      <span className="text-xs text-gray-500">Budget {formatRupiah(s.budget)}</span>
                    </div>
                    <div className="text-xs text-gray-600 line-clamp-2">{s.brief.substring(0, 130)}...</div>
                    {done && (
                      <div className="mt-3 flex items-center gap-1">
                        {[1,2,3].map(i => (
                          <Star key={i} className={`w-4 h-4 ${i <= done.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-xs text-gray-500 ml-2">ROAS {done.roas.toFixed(2)}x</span>
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
          Dibuat untuk belajar Meta Ads. Simulasi, bukan platform iklan sungguhan.
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: ADS MANAGER (Replica Meta)
// ============================================================
function AdsManagerScreen({ scenario, onBack, onPublish }) {
  const [activeTab, setActiveTab] = useState('campaign');
  const [config, setConfig] = useState({
    campaignName: `${scenario.client} - Campaign`,
    objective: '',
    dailyBudget: Math.round(scenario.budget / scenario.duration),
    ageMin: 18, ageMax: 65,
    gender: 'all',
    location: '',
    interests: [],
    placements: [],
    creative: '',
    destination: '',
    cta: '',
    adHeadline: '',
    adPrimaryText: ''
  });

  const updateConfig = (key, value) => setConfig(c => ({ ...c, [key]: value }));
  const toggleArray = (key, value) => setConfig(c => ({
    ...c,
    [key]: c[key].includes(value) ? c[key].filter(v => v !== value) : [...c[key], value]
  }));

  const canPublish = config.objective && config.location && config.interests.length > 0 &&
    config.placements.length > 0 && config.creative && config.destination && config.cta;

  const handlePublish = () => {
    onPublish(config);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <div className="bg-[#0A4DA8] text-white px-4 py-2 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="hover:bg-white/10 p-1.5 rounded">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-[#0A4DA8] font-bold text-xs">f</span>
            </div>
            <span className="font-semibold text-sm">Ads Manager</span>
          </div>
          <div className="text-white/60 text-sm">·</div>
          <div className="text-sm text-white/90">{scenario.client}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-white/70">Draft · Auto-saved</div>
          <button
            disabled={!canPublish}
            onClick={handlePublish}
            className={`px-4 py-1.5 rounded text-sm font-medium ${
              canPublish ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-white/20 text-white/50 cursor-not-allowed'
            }`}
          >
            Publish
          </button>
        </div>
      </div>

      {/* Brief banner */}
      <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-start gap-3">
          <Briefcase className="w-4 h-4 text-blue-700 mt-0.5 flex-shrink-0" />
          <div className="flex-1 text-sm">
            <span className="font-medium text-blue-900">Brief dari {scenario.client}:</span>
            <span className="text-blue-800 ml-1">"{scenario.brief}"</span>
          </div>
          <div className="flex items-center gap-3 text-xs flex-shrink-0">
            <span className="text-blue-900"><strong>Budget:</strong> {formatRupiah(scenario.budget)}</span>
            <span className="text-blue-900"><strong>Durasi:</strong> {scenario.duration} hari</span>
            <span className="text-blue-900"><strong>Target:</strong> {scenario.kpi}</span>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex max-w-6xl mx-auto">
        {/* Sidebar: hierarchy */}
        <div className="w-56 bg-white border-r border-gray-200 min-h-[600px]">
          <div className="p-3">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2 px-2">Struktur</div>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab('campaign')}
                className={`w-full text-left px-2 py-2 rounded text-sm flex items-center gap-2 ${
                  activeTab === 'campaign' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Megaphone className="w-4 h-4" /> Campaign
              </button>
              <button
                onClick={() => setActiveTab('adset')}
                className={`w-full text-left pl-7 pr-2 py-2 rounded text-sm flex items-center gap-2 ${
                  activeTab === 'adset' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Users className="w-4 h-4" /> Ad Set
              </button>
              <button
                onClick={() => setActiveTab('ad')}
                className={`w-full text-left pl-12 pr-2 py-2 rounded text-sm flex items-center gap-2 ${
                  activeTab === 'ad' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ImageIcon className="w-4 h-4" /> Ad
              </button>
            </div>
          </div>
          <div className="p-3 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-2">Progress</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5">
                {config.objective ? <CheckCircle2 className="w-3 h-3 text-green-600"/> : <div className="w-3 h-3 rounded-full border border-gray-300"/>}
                Objective
              </div>
              <div className="flex items-center gap-1.5">
                {config.location && config.interests.length > 0 ? <CheckCircle2 className="w-3 h-3 text-green-600"/> : <div className="w-3 h-3 rounded-full border border-gray-300"/>}
                Audience
              </div>
              <div className="flex items-center gap-1.5">
                {config.placements.length > 0 ? <CheckCircle2 className="w-3 h-3 text-green-600"/> : <div className="w-3 h-3 rounded-full border border-gray-300"/>}
                Placement
              </div>
              <div className="flex items-center gap-1.5">
                {config.creative && config.destination ? <CheckCircle2 className="w-3 h-3 text-green-600"/> : <div className="w-3 h-3 rounded-full border border-gray-300"/>}
                Ad creative
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-white p-6">
          {activeTab === 'campaign' && <CampaignTab config={config} updateConfig={updateConfig} scenario={scenario} />}
          {activeTab === 'adset' && <AdSetTab config={config} updateConfig={updateConfig} toggleArray={toggleArray} />}
          {activeTab === 'ad' && <AdTab config={config} updateConfig={updateConfig} />}

          <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                if (activeTab === 'adset') setActiveTab('campaign');
                else if (activeTab === 'ad') setActiveTab('adset');
              }}
              disabled={activeTab === 'campaign'}
              className={`px-4 py-2 text-sm rounded border ${
                activeTab === 'campaign' ? 'opacity-30 cursor-not-allowed border-gray-200' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              ← Back
            </button>
            {activeTab !== 'ad' ? (
              <button
                onClick={() => {
                  if (activeTab === 'campaign') setActiveTab('adset');
                  else if (activeTab === 'adset') setActiveTab('ad');
                }}
                className="px-4 py-2 text-sm rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handlePublish}
                disabled={!canPublish}
                className={`px-4 py-2 text-sm rounded font-medium ${
                  canPublish ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Publish Campaign
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Campaign tab
function CampaignTab({ config, updateConfig, scenario }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Campaign</h2>
      <p className="text-sm text-gray-500 mb-6">Atur tujuan utama campaign kamu</p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Campaign name</label>
          <input
            type="text"
            value={config.campaignName}
            onChange={(e) => updateConfig('campaignName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campaign objective <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-3">Pilih hasil yang paling kamu inginkan. Meta akan optimize pengiriman iklan untuk tujuan ini.</p>
          <div className="grid grid-cols-2 gap-2">
            {OBJECTIVES.map(obj => (
              <button
                key={obj.value}
                onClick={() => updateConfig('objective', obj.value)}
                className={`text-left p-3 border-2 rounded transition ${
                  config.objective === obj.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm text-gray-900">{obj.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{obj.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded p-3">
          <div className="text-xs text-gray-500 mb-1">Buying type</div>
          <div className="text-sm font-medium text-gray-900">Auction (default)</div>
        </div>
      </div>
    </div>
  );
}

// Ad Set tab
function AdSetTab({ config, updateConfig, toggleArray }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Ad Set</h2>
      <p className="text-sm text-gray-500 mb-6">Tentukan siapa yang akan melihat iklan, dimana, dan berapa budget-nya</p>

      <div className="space-y-6">
        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Daily budget</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Rp</span>
            <input
              type="number"
              value={config.dailyBudget}
              onChange={(e) => updateConfig('dailyBudget', parseInt(e.target.value) || 0)}
              className="px-3 py-2 border border-gray-300 rounded text-sm w-48 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <span className="text-xs text-gray-500">/ hari</span>
          </div>
        </div>

        {/* Age & Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <input
                type="number" min="13" max="65"
                value={config.ageMin}
                onChange={(e) => updateConfig('ageMin', parseInt(e.target.value) || 18)}
                className="px-2 py-1.5 border border-gray-300 rounded text-sm w-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <span className="text-gray-400">—</span>
              <input
                type="number" min="13" max="65"
                value={config.ageMax}
                onChange={(e) => updateConfig('ageMax', parseInt(e.target.value) || 65)}
                className="px-2 py-1.5 border border-gray-300 rounded text-sm w-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <span className="text-xs text-gray-500">tahun</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <div className="flex gap-2">
            {['all', 'male', 'female'].map(g => (
              <button
                key={g}
                onClick={() => updateConfig('gender', g)}
                className={`px-4 py-1.5 rounded text-sm border-2 capitalize ${
                  config.gender === g ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {g === 'all' ? 'Semua' : g === 'male' ? 'Laki-laki' : 'Perempuan'}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <select
            value={config.location}
            onChange={(e) => updateConfig('location', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm w-full max-w-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Pilih lokasi...</option>
            {LOCATIONS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Detailed targeting (interests) <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-3">Pilih 1-4 interest yang paling relevan. Terlalu banyak bikin audience melebar.</p>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map(i => (
              <button
                key={i.value}
                onClick={() => toggleArray('interests', i.value)}
                className={`px-3 py-1.5 rounded-full text-sm border-2 ${
                  config.interests.includes(i.value)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {i.label}
              </button>
            ))}
          </div>
        </div>

        {/* Placements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Placements <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-3">Tentukan dimana iklan akan muncul</p>
          <div className="grid grid-cols-2 gap-2">
            {PLACEMENTS.map(p => {
              const Icon = p.icon;
              const active = config.placements.includes(p.value);
              return (
                <button
                  key={p.value}
                  onClick={() => toggleArray('placements', p.value)}
                  className={`flex items-center gap-2 p-2.5 border-2 rounded ${
                    active ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Ad tab
function AdTab({ config, updateConfig }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Ad</h2>
      <p className="text-sm text-gray-500 mb-6">Bikin creative dan tentukan kemana orang akan diarahkan</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Creative angle <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-3">Gaya penyajian creative yang akan dipakai</p>
          <div className="grid grid-cols-2 gap-2">
            {CREATIVES.map(c => (
              <button
                key={c.value}
                onClick={() => updateConfig('creative', c.value)}
                className={`text-left p-3 border-2 rounded ${
                  config.creative === c.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm text-gray-900">{c.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{c.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-3">Kemana orang yang klik iklan akan dibawa?</p>
          <div className="grid grid-cols-2 gap-2">
            {DESTINATIONS.map(d => {
              const Icon = d.icon;
              return (
                <button
                  key={d.value}
                  onClick={() => updateConfig('destination', d.value)}
                  className={`flex items-center gap-2 p-2.5 border-2 rounded ${
                    config.destination === d.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{d.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Call-to-action button <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {CTAS.map(c => (
              <button
                key={c.value}
                onClick={() => updateConfig('cta', c.value)}
                className={`px-3 py-1.5 rounded text-sm border-2 ${
                  config.cta === c.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: RUNNING (animation)
// ============================================================
function RunningScreen({ scenario, results, onDone }) {
  const [elapsed, setElapsed] = useState(0);
  const DURATION = 18; // seconds
  const progress = Math.min(elapsed / DURATION, 1);
  const dayIndex = Math.min(Math.floor(progress * scenario.duration), scenario.duration - 1);

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => {
      const sec = (Date.now() - start) / 1000;
      setElapsed(sec);
      if (sec >= DURATION + 0.5) {
        clearInterval(tick);
        setTimeout(onDone, 400);
      }
    }, 50);
    return () => clearInterval(tick);
  }, [onDone]);

  const showImpressions = Math.round(results.impressions * progress);
  const showClicks = Math.round(results.clicks * progress);
  const showConversions = Math.round(results.conversions * progress);
  const showSpent = Math.round(results.spent * progress);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="max-w-3xl w-full px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full text-green-400 text-sm mb-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            Campaign Active
          </div>
          <h1 className="text-3xl font-bold mb-2">{scenario.client}</h1>
          <p className="text-gray-400">Day {dayIndex + 1} of {scenario.duration} · Sedang mengantar iklan...</p>
        </div>

        {/* Progress bar */}
        <div className="bg-gray-800 rounded-full h-1.5 mb-10 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all"
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>

        {/* Live metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
              <Eye className="w-3.5 h-3.5" /> Impressions
            </div>
            <div className="text-2xl font-bold tabular-nums">{formatNumber(showImpressions)}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
              <MousePointer2 className="w-3.5 h-3.5" /> Clicks
            </div>
            <div className="text-2xl font-bold tabular-nums">{formatNumber(showClicks)}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
              <Target className="w-3.5 h-3.5" /> Conversions
            </div>
            <div className="text-2xl font-bold tabular-nums">{formatNumber(showConversions)}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
              <DollarSign className="w-3.5 h-3.5" /> Spent
            </div>
            <div className="text-2xl font-bold tabular-nums">{formatRupiah(showSpent)}</div>
          </div>
        </div>

        {/* Mini chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="text-xs text-gray-400 mb-3">Daily impressions</div>
          <div className="flex items-end gap-1.5 h-24">
            {results.dailyBreakdown.map((d, i) => {
              const max = Math.max(...results.dailyBreakdown.map(x => x.impressions));
              const heightPct = (d.impressions / max) * 100;
              const isVisible = i <= dayIndex;
              return (
                <div key={i} className="flex-1 flex flex-col justify-end items-center gap-1">
                  <div
                    className={`w-full rounded-t transition-all duration-300 ${
                      isVisible ? 'bg-blue-500' : 'bg-gray-800'
                    }`}
                    style={{ height: isVisible ? `${heightPct}%` : '0%' }}
                  ></div>
                  <div className="text-[10px] text-gray-500">D{d.day}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: RESULTS
// ============================================================
function ResultsScreen({ scenario, config, results, onBack, onContinue }) {
  const reaction = getBosReaction(results.roas, scenario.targetROAS, results.spent);
  const stars = results.roas >= scenario.targetROAS * 1.3 ? 3 :
                results.roas >= scenario.targetROAS ? 2 :
                results.roas >= scenario.targetROAS * 0.6 ? 1 : 0;

  const decisions = [
    { key: 'objective', label: 'Campaign objective', picked: OBJECTIVES.find(o => o.value === config.objective)?.label, ideal: OBJECTIVES.find(o => o.value === scenario.ideal.objective)?.label, score: results.scores.objective },
    { key: 'age', label: 'Age range', picked: `${config.ageMin}–${config.ageMax}`, ideal: `${scenario.ideal.ageMin}–${scenario.ideal.ageMax}`, score: results.scores.age },
    { key: 'gender', label: 'Gender', picked: config.gender, ideal: scenario.ideal.gender, score: results.scores.gender },
    { key: 'location', label: 'Location', picked: LOCATIONS.find(l => l.value === config.location)?.label, ideal: LOCATIONS.find(l => l.value === scenario.ideal.location)?.label, score: results.scores.location },
    { key: 'interests', label: 'Interests', picked: config.interests.map(i => INTERESTS.find(x => x.value === i)?.label).filter(Boolean).join(', ') || '—', ideal: scenario.ideal.interests.map(i => INTERESTS.find(x => x.value === i)?.label).filter(Boolean).join(', '), score: results.scores.interests },
    { key: 'placement', label: 'Placements', picked: config.placements.map(p => PLACEMENTS.find(x => x.value === p)?.label.split(' ')[0]).join(', '), ideal: scenario.ideal.placements.map(p => PLACEMENTS.find(x => x.value === p)?.label.split(' ')[0]).join(', '), score: results.scores.placement },
    { key: 'creative', label: 'Creative angle', picked: CREATIVES.find(c => c.value === config.creative)?.label, ideal: CREATIVES.find(c => c.value === scenario.ideal.creative)?.label, score: results.scores.creative },
    { key: 'destination', label: 'Destination', picked: DESTINATIONS.find(d => d.value === config.destination)?.label, ideal: DESTINATIONS.find(d => d.value === scenario.ideal.destination)?.label, score: results.scores.destination }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5"/>
          </button>
          <div>
            <div className="text-xs text-gray-500">Campaign Report</div>
            <div className="font-semibold text-gray-900">{scenario.client}</div>
          </div>
          <div className="ml-auto flex items-center gap-1">
            {[1,2,3].map(i => (
              <Star key={i} className={`w-5 h-5 ${i <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}/>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Hero metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <MetricCard label="Spent" value={formatRupiah(results.spent)} icon={DollarSign}/>
          <MetricCard label="Impressions" value={formatNumber(results.impressions)} sub={`Reach ${formatNumber(results.reach)}`} icon={Eye}/>
          <MetricCard label="Clicks" value={formatNumber(results.clicks)} sub={`CTR ${(results.ctr*100).toFixed(2)}%`} icon={MousePointer2}/>
          <MetricCard label="Conversions" value={formatNumber(results.conversions)} sub={`CPL ${formatRupiah(results.cpl)}`} icon={Target}/>
        </div>

        {/* ROAS hero */}
        <div className={`rounded-xl p-6 mb-6 border-2 ${
          results.roas >= scenario.targetROAS ? 'bg-green-50 border-green-200' :
          results.roas >= scenario.targetROAS * 0.6 ? 'bg-amber-50 border-amber-200' :
          'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Return on Ad Spend</div>
              <div className="text-5xl font-bold text-gray-900">{results.roas.toFixed(2)}<span className="text-2xl text-gray-500">x</span></div>
              <div className="text-sm text-gray-600 mt-2">
                Revenue {formatRupiah(results.revenue)} · Target {scenario.targetROAS}x
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Status</div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                results.roas >= scenario.targetROAS ? 'bg-green-600 text-white' :
                results.roas >= scenario.targetROAS * 0.6 ? 'bg-amber-500 text-white' :
                'bg-red-600 text-white'
              }`}>
                {results.roas >= scenario.targetROAS ? <><CheckCircle2 className="w-4 h-4"/> Target tercapai</> :
                 results.roas >= scenario.targetROAS * 0.6 ? <><Info className="w-4 h-4"/> Di bawah target</> :
                 <><XCircle className="w-4 h-4"/> Gagal</>}
              </div>
            </div>
          </div>
        </div>

        {/* Bos reaction */}
        <div className={`rounded-lg p-5 mb-6 border-2 ${reaction.color}`}>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-white border-2 border-current flex items-center justify-center text-3xl flex-shrink-0">
              {reaction.emoji}
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wide mb-1">{reaction.title}</div>
              <p className="text-sm leading-relaxed">"{reaction.message}"</p>
              <div className="text-xs mt-2 opacity-75">— Pak Budi, Head of Performance Marketing</div>
            </div>
          </div>
        </div>

        {/* Post-mortem: decision breakdown */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
          <h3 className="font-semibold text-gray-900 mb-1">Analisis keputusanmu</h3>
          <p className="text-xs text-gray-500 mb-4">Bandingkan pilihan kamu dengan strategi ideal</p>
          <div className="space-y-2">
            {decisions.map((d) => {
              const good = d.score >= 0.75;
              const ok = d.score >= 0.5;
              return (
                <div key={d.key} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                  <div className="flex-shrink-0 mt-0.5">
                    {good ? <CheckCircle2 className="w-4 h-4 text-green-600"/> :
                     ok ? <div className="w-4 h-4 rounded-full border-2 border-amber-500 bg-amber-100"/> :
                     <XCircle className="w-4 h-4 text-red-500"/>}
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-3 text-sm">
                    <div className="text-gray-700 font-medium">{d.label}</div>
                    <div className="text-gray-900">{d.picked || '—'}</div>
                    <div className="text-gray-500">Ideal: {d.ideal}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lessons */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <Info className="w-4 h-4"/> Pelajaran penting dari brief ini
          </h3>
          <div className="space-y-3 text-sm text-blue-900">
            {Object.entries(scenario.lessons).map(([k, v]) => (
              <div key={k}>
                <div className="font-medium capitalize mb-0.5">{k === 'objective' ? 'Tentang objective' : k === 'audience' ? 'Tentang audience' : k === 'creative' ? 'Tentang creative' : k === 'destination' ? 'Tentang destination' : k === 'placements' ? 'Tentang placements' : k === 'location' ? 'Tentang targeting lokasi' : k}</div>
                <div className="text-blue-800 leading-relaxed">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4"/> Coba lagi
          </button>
          <button
            onClick={onContinue}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
          >
            Lanjut ke klien berikutnya <ChevronRight className="w-4 h-4"/>
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [screen, setScreen] = useState('home');
  const [scenario, setScenario] = useState(null);
  const [config, setConfig] = useState(null);
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState({ completed: [], totalStars: 0, bosApproval: 50, rank: 'Junior' });

  // Load progress on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ads_sim_progress');
      if (saved) setProgress(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const saveProgress = (p) => {
    try {
      localStorage.setItem('ads_sim_progress', JSON.stringify(p));
    } catch (e) {}
  };

  const handleSelectScenario = (s) => {
    setScenario(s);
    setScreen('adsmanager');
  };

  const handlePublish = (cfg) => {
    const campaignConfig = {
      ...cfg,
      budget: cfg.dailyBudget * scenario.duration
    };
    setConfig(campaignConfig);
    const r = simulate(scenario, campaignConfig);
    setResults(r);
    setScreen('running');
  };

  const handleRunningDone = () => {
    // Update progress
    const stars = results.roas >= scenario.targetROAS * 1.3 ? 3 :
                  results.roas >= scenario.targetROAS ? 2 :
                  results.roas >= scenario.targetROAS * 0.6 ? 1 : 0;
    const existing = progress.completed.findIndex(c => c.id === scenario.id);
    const completed = [...progress.completed];
    const record = { id: scenario.id, stars, roas: results.roas };
    if (existing >= 0) {
      if (stars > completed[existing].stars) completed[existing] = record;
    } else {
      completed.push(record);
    }
    const totalStars = completed.reduce((sum, c) => sum + c.stars, 0);
    const bosApproval = Math.max(20, Math.min(100, 50 + totalStars * 5 - (completed.length - totalStars/3) * 3));
    const rank = totalStars >= 12 ? 'CMO' : totalStars >= 8 ? 'Senior' : totalStars >= 4 ? 'Mid' : 'Junior';
    const newProgress = { completed, totalStars, bosApproval: Math.round(bosApproval), rank };
    setProgress(newProgress);
    saveProgress(newProgress);
    setScreen('results');
  };

  const handleResultsBack = () => {
    setScreen('adsmanager');
  };

  const handleContinue = () => {
    setScenario(null);
    setConfig(null);
    setResults(null);
    setScreen('home');
  };

  if (screen === 'home') return <HomeScreen scenarios={SCENARIOS} progress={progress} onSelect={handleSelectScenario} />;
  if (screen === 'adsmanager') return <AdsManagerScreen scenario={scenario} onBack={() => setScreen('home')} onPublish={handlePublish} />;
  if (screen === 'running') return <RunningScreen scenario={scenario} results={results} onDone={handleRunningDone} />;
  if (screen === 'results') return <ResultsScreen scenario={scenario} config={config} results={results} onBack={handleResultsBack} onContinue={handleContinue} />;
  return null;
}
