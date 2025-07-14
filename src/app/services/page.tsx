

'use client';

import Link from 'next/link';

export default function Services() {
  // ?¬ë? ?°ì´??- ?˜ì¤‘???¤ì œ ?´ë?ì§€?€ ?´ìš©?¼ë¡œ êµì²´ ê°€??
  const cases = [
    {
      id: 1,
      title: "?…ì°°ê¶??¬ê¸° ?¼í•´ ?Œë³µ ?¬ë?",
      category: "?…ì°°ê¶?,
      description: "ê³µê³µê¸°ê? ?…ì°° ê´€???¬ê¸° ?¼í•´ê¸??„ì•¡ ?Œìˆ˜ ?±ê³µ",
      image: "/images/buil.jpg",
      result: "?¼í•´ê¸?100% ?Œìˆ˜"
    },
    {
      id: 2,
      title: "ê³¨í”„ ?Œì›ê¶??˜ë¶ˆ ?±ê³µ ?¬ë?",
      category: "?Œì›ê¶?,
      description: "ê³¨í”„???ì—…?¼ë¡œ ?¸í•œ ?Œì›ê¶??˜ë¶ˆ ?Œì†¡ ?¹ì†Œ",
      image: "/images/buil.jpg",
      result: "?„ì•¡ ?˜ë¶ˆ ?±ê³µ"
    },
    {
      id: 3,
      title: "ê°€?í™”???¬ì?¬ê¸° êµ¬ì œ ?¬ë?",
      category: "?¬ì?¬ê¸°",
      description: "ê°€?í™”???¬ì?¬ê¸°ë¡??¸í•œ ?¼í•´ê¸??Œìˆ˜",
      image: "/images/buil.jpg",
      result: "?¼í•´ê¸?95% ?Œìˆ˜"
    },
    {
      id: 4,
      title: "ë³´ì´?¤í”¼???¼í•´ ?Œë³µ ?¬ë?",
      category: "ë³´ì´?¤í”¼??,
      description: "?„í™”ê¸ˆìœµ?¬ê¸° ?¼í•´ê¸?? ì† ?Œìˆ˜",
      image: "/images/buil.jpg",
      result: "?¼í•´ê¸?90% ?Œìˆ˜"
    },
    {
      id: 5,
      title: "?°ì??¬ê¸° ì§‘ë‹¨?Œì†¡ ?¬ë?",
      category: "?¬ì?¬ê¸°",
      description: "?€ê·œëª¨ ?°ì??¬ê¸° ì§‘ë‹¨?Œì†¡ ?¹ì†Œ",
      image: "/images/buil.jpg",
      result: "ì§‘ë‹¨?Œì†¡ ?¹ì†Œ"
    },
    {
      id: 6,
      title: "ì½˜ë„ ?Œì›ê¶?ë¶„ìŸ ?´ê²° ?¬ë?",
      category: "?Œì›ê¶?,
      description: "ì½˜ë„ ?Œì›ê¶?ê³„ì•½ ë¶„ìŸ ?ë§Œ ?´ê²°",
      image: "/images/buil.jpg",
      result: "?©ì˜ ?±ê³µ"
    },
    {
      id: 7,
      title: "ë©”ì‹ ?€ ?¼ì‹± ?¬ê¸° êµ¬ì œ ?¬ë?",
      category: "ë³´ì´?¤í”¼??,
      description: "ë©”ì‹ ?€ë¥??µí•œ ê¸ˆìœµ?¬ê¸° ?¼í•´ ?Œë³µ",
      image: "/images/buil.jpg",
      result: "?¼í•´ê¸?85% ?Œìˆ˜"
    },
    {
      id: 8,
      title: "?…ì°° ?ê²© ë°°ì œ êµ¬ì œ ?¬ë?",
      category: "?…ì°°ê¶?,
      description: "ë¶€?¹í•œ ?…ì°° ?ê²© ë°°ì œ ì²˜ë¶„ ì·¨ì†Œ",
      image: "/images/buil.jpg",
      result: "ì²˜ë¶„ ì·¨ì†Œ ?±ê³µ"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">?±ê³µ ?¬ë?</h1>
          <p className="text-xl text-gray-200">15?„ê°„ ì¶•ì ???„ë¬¸?±ìœ¼ë¡??´ë£¨?´ë‚¸ ?¤ì œ ?±ê³¼??/p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-2xl font-bold text-center text-gray-800 mb-16">ê³ ê°???¤ì œ ?€?”ë‚´?©ê³¼ ?¨ê»˜ ?•ì¸?˜ëŠ” ?±ê³µ ?¤í† ë¦?/p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cases.map((caseItem) => (
              <div key={caseItem.id} className="bg-white rounded-lg shadow border border-gray-200">
                {/* ?´ë?ì§€ ?ì—­ - ì¹´í†¡ ?¤í¬ë¦°ìƒ·???¤ì–´ê°?ê³?*/}
                <div className="aspect-[3/4] bg-gray-200 relative">
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // ?´ë?ì§€ ë¡œë“œ ?¤íŒ¨??placeholder ?œì‹œ
                      e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23f3f4f6"/><text x="50%" y="45%" text-anchor="middle" fill="%236b7280" font-size="16">ì¹´í†¡ ?€???´ë?ì§€</text><text x="50%" y="55%" text-anchor="middle" fill="%236b7280" font-size="14">ì¤€ë¹?ì¤?/text></svg>';
                    }}
                  />
                  
                  {/* ì¹´í…Œê³ ë¦¬ ë±ƒì? */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
                      {caseItem.category}
                    </span>
                  </div>
                </div>

                {/* ?´ìš© ?ì—­ */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {caseItem.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {caseItem.description}
                  </p>
                  
                  {/* ê²°ê³¼ */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">ê²°ê³¼</span>
                    <span className="text-sm font-semibold text-green-600">
                      {caseItem.result}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">?„ì  ?±ê³¼</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">900+</div>
              <div className="text-lg font-medium text-gray-700">?±ê³µ ?¬ë?</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">91%</div>
              <div className="text-lg font-medium text-gray-700">?¹ì†Œ??/div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">190??/div>
              <div className="text-lg font-medium text-gray-700">?¼í•´ê¸??Œìˆ˜??/div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">4ê°œì›”</div>
              <div className="text-lg font-medium text-gray-700">?‰ê·  ?´ê²°ê¸°ê°„</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">ë¹„ìŠ·???¼í•´ë¥??¹í•˜?¨ë‚˜??</h2>
          <p className="text-lg mb-8">
            ?„ì? ê°™ì? ?±ê³µ ?¬ë??¤ì²˜?? ê·€?˜ì˜ ?¼í•´??ë°˜ë“œ???Œë³µ?????ˆìŠµ?ˆë‹¤.<br />
            ì§€ê¸?ë°”ë¡œ ë¬´ë£Œ ?ë‹´??? ì²­?˜ì—¬ ?„ë¬¸ê°€???„ì???ë°›ì•„ë³´ì„¸??
          </p>
          <Link href="/contact" className="bg-white text-slate-700 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors block text-center">
            ë¬´ë£Œ ?ë‹´ ? ì²­?˜ê¸°
          </Link>
        </div>
      </section>
    </div>
  );
} 
