import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Reviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('most-recent');
  const [reviewsToShow, setReviewsToShow] = useState(4);

  // Sample product reviews data - Medical equipment style (27 reviews for 4.8 rating)
  const reviews = [
    {
      id: 1,
      customerName: "Dr. Ahmad H.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Excellent quality surgical scissors!",
      review: "These surgical scissors exceeded my expectations. The craftsmanship is incredible and the German stainless steel quality is premium. Perfect for general surgery procedures. The precision and sharpness are outstanding. Highly recommend for medical professionals.",
      date: "December 15, 2024",
      productName: "Premium Surgical Scissors Set",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "6 inch",
      color: "Silver",
      helpfulVotes: 12,
      totalVotes: 14,
      images: [
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=387&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=388&auto=format&fit=crop&q=60"
      ]
    },
    {
      id: 2,
      customerName: "Dr. Sarah A.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Outstanding forceps set!",
      review: "The forceps set is absolutely outstanding! The quality is excellent and the grip is perfect. The German stainless steel is durable yet precise. Perfect for cardiovascular procedures and looks very professional. Great value for money!",
      date: "December 14, 2024",
      productName: "Cardiovascular Forceps Set",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Medium",
      color: "Silver",
      helpfulVotes: 18,
      totalVotes: 20,
      images: []
    },
    {
      id: 3,
      customerName: "Dr. Ali M.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Perfect orthopedic set!",
      review: "This orthopedic instrument set is exactly what I was looking for. The German stainless steel finish is beautiful and authentic. Perfect for bone surgery procedures. The craftsmanship is gorgeous and the overall quality is excellent. Fast delivery too!",
      date: "December 12, 2024",
      productName: "Orthopedic Surgery Set",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Complete Set",
      color: "Silver",
      helpfulVotes: 15,
      totalVotes: 16,
      images: [
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=435&auto=format&fit=crop&q=60"
      ]
    },
    {
      id: 4,
      customerName: "Dr. Fatima H.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Excellent dental instruments!",
      review: "These dental instruments are perfect for my practice. Modern design and excellent craftsmanship. The stainless steel finish doesn't tarnish which is great. Excellent quality and fast delivery from Bhatti Industries.",
      date: "December 10, 2024",
      productName: "Dental Surgery Kit",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Standard",
      color: "Silver",
      helpfulVotes: 22,
      totalVotes: 24,
      images: []
    },
    {
      id: 5,
      customerName: "Dr. Hassan L.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Superior ENT instruments!",
      review: "These ENT instruments are so versatile! I can use them for various ear, nose, and throat procedures. The material is high quality and the design is beautiful. Great value for money. Will definitely order more from Bhatti Industries.",
      date: "December 8, 2024",
      productName: "ENT Surgery Kit",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Complete Set",
      color: "Silver",
      helpfulVotes: 19,
      totalVotes: 21,
      images: []
    },
    {
      id: 6,
      customerName: "Dr. Hina R.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good quality, fast delivery",
      review: "The product quality is very good for the price. Delivery was faster than expected and the packaging was excellent. The neurosurgery instruments fit well and work exactly as described. Satisfied with my purchase.",
      date: "December 6, 2024",
      productName: "Neurosurgery Instrument Set",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Micro",
      color: "Silver",
      helpfulVotes: 14,
      totalVotes: 16,
      images: []
    },
    {
      id: 7,
      customerName: "Dr. Nadia S.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Beautiful surgical retractors!",
      review: "The surgical retractors are absolutely stunning! The precision and smoothness are remarkable. Perfect for exposure during surgery. The quality is premium and the craftsmanship is excellent. Highly recommend for surgical procedures!",
      date: "December 4, 2024",
      productName: "Surgical Retractor Set",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Large",
      color: "Titanium",
      helpfulVotes: 25,
      totalVotes: 27,
      images: [
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=387&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=388&auto=format&fit=crop&q=60"
      ]
    },
    {
      id: 8,
      customerName: "Dr. Rabia K.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Exceeded expectations!",
      review: "This biopsy needle set is even better than I expected. The needles are sharp and precise, perfect for tissue sampling. The quality is vibrant and the construction is impeccable. Great customer service from Bhatti Industries too!",
      date: "December 2, 2024",
      productName: "Biopsy Needle Set",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "18G",
      color: "Silver",
      helpfulVotes: 16,
      totalVotes: 18,
      images: []
    },
    {
      id: 9,
      customerName: "Dr. Amina T.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Premium quality instruments",
      review: "The instrument quality is outstanding! This scalpel set is perfect for precision procedures. The craftsmanship is intricate and beautiful. Received many compliments from colleagues when I used them in the OR.",
      date: "November 30, 2024",
      productName: "Premium Scalpel Set",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Blade #10-15",
      color: "Silver",
      helpfulVotes: 21,
      totalVotes: 23,
      images: []
    },
    {
      id: 10,
      customerName: "Dr. Khadija M.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good quality and precise",
      review: "This surgical clamp set fits perfectly and is very durable. The design is professional and the steel is corrosion-resistant. Only minor issue is that the finish was slightly different than the photo, but still beautiful.",
      date: "November 28, 2024",
      productName: "Surgical Clamp Set",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Medium",
      color: "Silver",
      helpfulVotes: 11,
      totalVotes: 13,
      images: []
    },
    {
      id: 11,
      customerName: "Dr. Saira A.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Beautiful and precise hemostats",
      review: "These hemostats are so elegant and practical. Perfect for both general and specialized procedures. The stainless steel is high quality and the design is ergonomic. Great value for money!",
      date: "November 26, 2024",
      productName: "Hemostat Clamp Set",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Curved",
      color: "Silver",
      helpfulVotes: 17,
      totalVotes: 19,
      images: []
    },
    {
      id: 12,
      customerName: "Dr. Farah B.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Professional quality at great price",
      review: "This surgical probe set is absolutely gorgeous! The steel is premium and the craftsmanship is exquisite. Perfect for diagnostic procedures. The packaging was also very nice and sterile.",
      date: "November 24, 2024",
      productName: "Surgical Probe Set",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Assorted",
      color: "Silver",
      helpfulVotes: 23,
      totalVotes: 25,
      images: [
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=387&auto=format&fit=crop&q=60"
      ]
    },
    {
      id: 13,
      customerName: "Dr. Uzma H.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Modern and efficient sutures",
      review: "These suture materials are perfect for modern surgery. The quality is contemporary and the material is biocompatible. Great for wound closure and post-operative care. Highly satisfied with Bhatti Industries!",
      date: "November 22, 2024",
      productName: "Surgical Suture Kit",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "3-0 to 6-0",
      color: "Blue",
      helpfulVotes: 13,
      totalVotes: 15,
      images: []
    },
    {
      id: 14,
      customerName: "Dr. Mehreen K.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Precision surgical drills",
      review: "This precision drill set is absolutely beautiful! The engineering details are amazing and the drill quality is premium. Perfect for orthopedic procedures. Worth every penny!",
      date: "November 20, 2024",
      productName: "Precision Drill Set",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "2-10mm",
      color: "Titanium",
      helpfulVotes: 28,
      totalVotes: 30,
      images: []
    },
    {
      id: 15,
      customerName: "Dr. Rubina S.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Professional and durable",
      review: "This surgical light is perfect for operating room settings. The illumination is comfortable and consistent. The build quality is good. The brightness is exactly as shown in specifications. Good quality for the price.",
      date: "November 18, 2024",
      productName: "LED Surgical Light",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "36W",
      color: "White",
      helpfulVotes: 9,
      totalVotes: 11,
      images: []
    },
    {
      id: 16,
      customerName: "Dr. Shazia R.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Excellent sterilization equipment",
      review: "This autoclave sterilizer is perfect for clinic use. The modern design is efficient and the sterilization is reliable. Great for everyday use. Fast delivery from Bhatti Industries too!",
      date: "November 16, 2024",
      productName: "Autoclave Sterilizer",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "12L",
      color: "Stainless Steel",
      helpfulVotes: 12,
      totalVotes: 14,
      images: []
    },
    {
      id: 17,
      customerName: "Dr. Tahira M.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Perfect for microsurgery!",
      review: "This microsurgery kit is absolutely stunning! The precision design is perfect for delicate procedures. The instruments are high-quality and the magnification is perfect. Received so many compliments!",
      date: "November 14, 2024",
      productName: "Microsurgery Kit",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Micro",
      color: "Titanium",
      helpfulVotes: 20,
      totalVotes: 22,
      images: [
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=387&auto=format&fit=crop&q=60"
      ]
    },
    {
      id: 18,
      customerName: "Dr. Yasmin A.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Ultra comfortable surgical gloves",
      review: "These surgical gloves are incredibly comfortable! Perfect for long procedures and sensitive operations. The latex is soft and the fit is excellent. Great for everyday surgical use.",
      date: "November 12, 2024",
      productName: "Surgical Gloves (Sterile)",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Size 7.5",
      color: "White",
      helpfulVotes: 8,
      totalVotes: 10,
      images: []
    },
    {
      id: 19,
      customerName: "Dr. Samina K.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good for clinical use",
      review: "This examination table is suitable for clinic and hospital use. The upholstery is professional and the construction is good. The height adjustment is smooth and the quality is decent.",
      date: "November 10, 2024",
      productName: "Medical Examination Table",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Standard",
      color: "Blue",
      helpfulVotes: 7,
      totalVotes: 9,
      images: []
    },
    {
      id: 20,
      customerName: "Dr. Naila H.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Classic stethoscope is excellent",
      review: "This classic cardiology stethoscope is absolutely beautiful! The acoustic quality is unique and the classic craftsmanship is outstanding. Great sound quality and fast shipping from Bhatti Industries. Love it!",
      date: "November 8, 2024",
      productName: "Cardiology Stethoscope",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Adult",
      color: "Black",
      helpfulVotes: 15,
      totalVotes: 17,
      images: []
    },
    {
      id: 21,
      customerName: "Dr. Bushra S.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Minimalist and precise",
      review: "This minimalist surgical kit is perfect for those who love simplicity. The design is clean and elegant. Great quality instruments and comfortable size. Exactly what I was looking for!",
      date: "November 6, 2024",
      productName: "Minimalist Surgery Kit",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Compact",
      color: "Silver",
      helpfulVotes: 10,
      totalVotes: 12,
      images: []
    },
    {
      id: 22,
      customerName: "Dr. Fouzia R.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Premium anesthesia kit stunning!",
      review: "This premium anesthesia kit is absolutely exquisite! The quality instruments and perfect precision are amazing for special procedures. The craftsmanship is outstanding. Worth the investment!",
      date: "November 4, 2024",
      productName: "Anesthesia Administration Kit",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Complete Set",
      color: "Silver",
      helpfulVotes: 32,
      totalVotes: 34,
      images: [
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=387&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=388&auto=format&fit=crop&q=60"
      ]
    },
    {
      id: 23,
      customerName: "Dr. Riffat M.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Perfect for mobile clinics",
      review: "This medical equipment case is light yet durable, perfect for mobile clinics. The organization is practical and the design is efficient. Great for field medical work. Highly recommend Bhatti Industries!",
      date: "November 2, 2024",
      productName: "Mobile Medical Kit",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Large",
      color: "Black",
      helpfulVotes: 14,
      totalVotes: 16,
      images: []
    },
    {
      id: 24,
      customerName: "Dr. Shaista K.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Traditional and reliable",
      review: "This traditional surgical instrument set with cultural heritage is beautiful and authentic. The quality is excellent and the design is timeless. Perfect for teaching hospitals and personal use.",
      date: "October 31, 2024",
      productName: "Traditional Surgery Set",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Heritage",
      color: "Brass",
      helpfulVotes: 18,
      totalVotes: 20,
      images: []
    },
    {
      id: 25,
      customerName: "Dr. Nayab A.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Executive medical organizer perfect",
      review: "This executive medical organizer is perfect for hospital and clinic management. The organization is professional and the materials are high quality. Great organization and excellent customer service from Bhatti Industries. Very satisfied!",
      date: "October 29, 2024",
      productName: "Medical Equipment Organizer",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Large",
      color: "Silver",
      helpfulVotes: 16,
      totalVotes: 18,
      images: []
    },
    {
      id: 26,
      customerName: "Dr. Ghazala S.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good quality, minor adjustment needed",
      review: "The quality is good and the design is nice. However, the handle was slightly longer for my preference. Overall satisfied with the purchase. The steel is durable and the finish is beautiful.",
      date: "October 27, 2024",
      productName: "Surgical Handle Set",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Standard",
      color: "Silver",
      helpfulVotes: 6,
      totalVotes: 8,
      images: []
    },
    {
      id: 27,
      customerName: "Dr. Lubna R.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Amazing craftsmanship work",
      review: "The craftsmanship on this surgical instrument set is absolutely amazing! The attention to detail is incredible. Perfect for complex procedures and special operations. The steel quality is premium. Highly recommend Bhatti Industries!",
      date: "October 25, 2024",
      productName: "Premium Surgery Set",
      productImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&auto=format&fit=crop&q=60",
      size: "Professional",
      color: "Titanium",
      helpfulVotes: 24,
      totalVotes: 26,
      images: []
    }
  ];

  // Calculate rating statistics
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  const ratingBreakdown = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  };

  // Filter and sort reviews
  const getFilteredReviews = () => {
    let filtered = reviews;

    if (selectedFilter !== 'all') {
      filtered = reviews.filter(review => review.rating === parseInt(selectedFilter));
    }

    switch (sortBy) {
      case 'most-recent':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'highest-rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest-rating':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'most-helpful':
        filtered.sort((a, b) => b.helpfulVotes - a.helpfulVotes);
        break;
      default:
        break;
    }

    return filtered.slice(0, reviewsToShow);
  };

  const filteredReviews = getFilteredReviews();
  const allFilteredReviews = (() => {
    let filtered = reviews;
    if (selectedFilter !== 'all') {
      filtered = reviews.filter(review => review.rating === parseInt(selectedFilter));
    }
    return filtered;
  })();

  const loadMoreReviews = () => {
    setReviewsToShow(prev => prev + 5);
  };

  const hasMoreReviews = reviewsToShow < allFilteredReviews.length;

  // Render star rating
  const renderStars = (rating, size = 'w-4 h-4') => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`${size} ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>

          {/* Rating Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Overall Rating */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                  {renderStars(Math.round(averageRating), 'w-6 h-6')}
                  <span className="text-2xl font-bold text-gray-900 ml-2">
                    {averageRating.toFixed(1)} out of 5
                  </span>
                </div>
                <p className="text-gray-600">{totalReviews} global ratings</p>
              </div>

              {/* Rating Breakdown */}
              <div className="lg:col-span-2">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center space-x-3">
                      <button
                        onClick={() => {
                          setSelectedFilter(star.toString());
                          setReviewsToShow(4);
                        }}
                        className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        <span>{star} star</span>
                      </button>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{
                            width: `${totalReviews > 0 ? (ratingBreakdown[star] / totalReviews) * 100 : 0}%`
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {Math.round((ratingBreakdown[star] / totalReviews) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
            <div className="flex flex-wrap items-center space-x-4">
              <button
                onClick={() => {
                  setSelectedFilter('all');
                  setReviewsToShow(4);
                }}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${selectedFilter === 'all'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                All reviews
              </button>
              {[5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    setSelectedFilter(star.toString());
                    setReviewsToShow(4);
                  }}
                  className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${selectedFilter === star.toString()
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {star} stars
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="most-recent">Most recent</option>
                <option value="oldest">Oldest</option>
                <option value="highest-rating">Highest rating</option>
                <option value="lowest-rating">Lowest rating</option>
                <option value="most-helpful">Most helpful</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col lg:flex-row lg:space-x-6">

                {/* Product Image */}
                <div className="flex-shrink-0 mb-4 lg:mb-0">
                  <Link href={`/product/${review.id}`}>
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:shadow-md transition-shadow duration-200">
                      <Image
                        src={review.productImage}
                        alt={review.productName}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  {/* Customer Info and Rating */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                      <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                      {review.isVerifiedPurchase && (
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-600">{review.date}</span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mb-3">
                    <Link href={`/product/${review.id}`} className="text-blue-600 hover:text-blue-800 text-sm">
                      {review.productName}
                    </Link>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>Size: {review.size}</span>
                      <span>Finish: {review.color}</span>
                    </div>
                  </div>

                  {/* Review Title */}
                  <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>

                  {/* Review Text */}
                  <p className="text-gray-700 mb-4 leading-relaxed">{review.review}</p>

                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex space-x-2 mb-4">
                      {review.images.map((image, index) => (
                        <div key={index} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={image}
                            alt={`Review image ${index + 1}`}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Helpful Votes */}
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-600">
                      {review.helpfulVotes} of {review.totalVotes} people found this helpful
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                        Helpful
                      </button>
                      <span className="text-gray-400">|</span>
                      <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreReviews && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreReviews}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Load More Reviews ({allFilteredReviews.length - reviewsToShow} remaining)
            </button>
          </div>
        )}

        {/* Review Summary Stats */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {Math.round((ratingBreakdown[5] / totalReviews) * 100)}%
              </div>
              <p className="text-gray-600 text-sm">5-star reviews</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {reviews.filter(r => r.isVerifiedPurchase).length}
              </div>
              <p className="text-gray-600 text-sm">Verified purchases</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {averageRating.toFixed(1)}
              </div>
              <p className="text-gray-600 text-sm">Average rating</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {reviews.filter(r => r.images && r.images.length > 0).length}
              </div>
              <p className="text-gray-600 text-sm">Reviews with photos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews; 