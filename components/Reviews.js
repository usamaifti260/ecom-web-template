import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Reviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('most-recent');
  const [reviewsToShow, setReviewsToShow] = useState(4);

  // Product reviews data for Marakish cleaning products (27 reviews for 4.8 rating)
  const reviews = [
    {
      id: 1,
      customerName: "Fatima A.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Best Chemical Dishwash Liquid!",
      review: "This Chemical Dishwash Liquid exceeded my expectations. Cuts through grease like magic and the freshness lasts for hours. Perfect for heavy-duty cleaning and daily use. The concentrated formula means a little goes a long way. Highly recommend for busy kitchens.",
      date: "December 15, 2024",
      productName: "Chemical Dishwash Liquid",
      productImage: "https://s.alicdn.com/@sc04/kf/H6d78604ad37b486396900db69d6801a4J.jpg_150x150.jpg",
      size: "1L",
      color: "Green",
      helpfulVotes: 12,
      totalVotes: 14,
      images: [
        "https://s.alicdn.com/@sc04/kf/H6d78604ad37b486396900db69d6801a4J.jpg_387x387.jpg",
        "https://s.alicdn.com/@sc04/kf/H966febf11edc4517a83767f5773bf9cbd.png_388x388.jpg"
      ]
    },
    {
      id: 2,
      customerName: "Ahmad H.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Outstanding Bathroom Cleaner Tezaab!",
      review: "The Bathroom Cleaner Tezaab is absolutely outstanding! Removes tough stains and lime scale effortlessly. The quality is excellent and the cleaning power is unmatched. Perfect for deep cleaning bathrooms and tiles. Great value for money!",
      date: "December 14, 2024",
      productName: "Bathroom Cleaner Tezaab",
      productImage: "https://s.alicdn.com/@sc04/kf/H2582b15b162d4a718fc68c5e7522acc2J.png_150x150.jpg",
      size: "500ml",
      color: "Blue",
      helpfulVotes: 18,
      totalVotes: 20,
      images: []
    },
    {
      id: 3,
      customerName: "Ayesha M.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Harpic Neel Bleach is amazing!",
      review: "This Harpic Neel Bleach is exactly what I was looking for. The disinfection power is incredible and kills 99.9% germs as promised. Perfect for toilet cleaning and sanitizing surfaces. The blue color indicator shows where it's working. Fast delivery too!",
      date: "December 12, 2024",
      productName: "Harpic Neel Bleach",
      productImage: "https://s.alicdn.com/@sc04/kf/HTB16VbPKeuSBuNjSsplq6ze8pXaD.jpg_150x150.jpg",
      size: "1L",
      color: "Blue",
      helpfulVotes: 15,
      totalVotes: 16,
      images: [
        "https://s.alicdn.com/@sc04/kf/HTB16VbPKeuSBuNjSsplq6ze8pXaD.jpg_435x435.jpg"
      ]
    },
    {
      id: 4,
      customerName: "Maria K.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Excellent Surf Excel Detergent!",
      review: "This Surf Excel Detergent is perfect for my family's laundry needs. Removes tough stains and keeps clothes bright and fresh. The powder dissolves completely and works great for both hand wash and machine wash. Excellent quality from Marakish.",
      date: "December 10, 2024",
      productName: "Surf Excel Detergent",
      productImage: "https://s.alicdn.com/@sc04/kf/Hb27ae62fe4b04d17ab0c24b8f153ec78m.jpg_150x150.jpg",
      size: "3kg",
      color: "Blue",
      helpfulVotes: 22,
      totalVotes: 24,
      images: []
    },
    {
      id: 5,
      customerName: "Zara L.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Antibacterial Handwash is excellent!",
      review: "This Antibacterial Handwash is so gentle yet effective! Kills germs while keeping hands soft and moisturized. The fragrance is pleasant and not overpowering. Great for daily use and family hygiene. Will definitely order more from Marakish.",
      date: "December 8, 2024",
      productName: "Antibacterial Handwash",
      productImage: "https://s.alicdn.com/@sc04/kf/Hae4319cb230b401397bd3f532ee9596ac.png_150x150.jpg",
      size: "300ml",
      color: "Clear",
      helpfulVotes: 19,
      totalVotes: 21,
      images: []
    },
    {
      id: 6,
      customerName: "Hina R.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good quality, fast delivery",
      review: "The product quality is very good for the price. Delivery was faster than expected and the packaging was excellent. The shampoo works effectively and leaves hair clean and fresh. Satisfied with my purchase.",
      date: "December 6, 2024",
      productName: "Hair Care Shampoo",
      productImage: "https://s.alicdn.com/@sc04/kf/H8420d36398fa4b8992b84ff23dcac060A.jpg_150x150.jpg",
      size: "400ml",
      color: "Pink",
      helpfulVotes: 14,
      totalVotes: 16,
      images: []
    },
    {
      id: 7,
      customerName: "Sadia S.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Powerful Floor Cleaner!",
      review: "The Floor Cleaner is absolutely stunning! The cleaning power and fresh scent are remarkable. Perfect for all types of flooring. Removes dirt and grime effectively while leaving a pleasant fragrance. Highly recommend for household cleaning!",
      date: "December 4, 2024",
      productName: "Multi-Surface Floor Cleaner",
      productImage: "https://s.alicdn.com/@sc04/kf/H2582b15b162d4a718fc68c5e7522acc2J.png_150x150.jpg",
      size: "1L",
      color: "Green",
      helpfulVotes: 25,
      totalVotes: 27,
      images: [
        "https://s.alicdn.com/@sc04/kf/H2582b15b162d4a718fc68c5e7522acc2J.png_387x387.jpg",
        "https://s.alicdn.com/@sc04/kf/Hba091f94c4cc4002ab237b7e923a1ca1z.jpg_388x388.jpg"
      ]
    },
    {
      id: 8,
      customerName: "Rabia K.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Exceeded expectations!",
      review: "This Fabric Softener is even better than I expected. Clothes come out soft and smell fresh for days. Perfect for sensitive skin and all fabric types. The concentrated formula works efficiently. Great customer service from Marakish too!",
      date: "December 2, 2024",
      productName: "Premium Fabric Softener",
      productImage: "https://s.alicdn.com/@sc04/kf/Hb75a3ad8b49a4286b7bf7cf0d4355e5c6.jpg_150x150.jpg",
      size: "2L",
      color: "Purple",
      helpfulVotes: 16,
      totalVotes: 18,
      images: []
    },
    {
      id: 9,
      customerName: "Amina T.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Premium quality toilet cleaner",
      review: "The toilet cleaner quality is outstanding! This sanitizing gel is perfect for deep cleaning and disinfection. The thick formula clings to surfaces and eliminates odors completely. Received many compliments on how fresh the bathroom smells.",
      date: "November 30, 2024",
      productName: "Toilet Bowl Sanitizing Gel",
      productImage: "https://s.alicdn.com/@sc04/kf/HTB1VjW3RpXXXXXJXFXX760XFXXXW.png_150x150.jpg",
      size: "750ml",
      color: "Blue",
      helpfulVotes: 21,
      totalVotes: 23,
      images: []
    },
    {
      id: 10,
      customerName: "Khadija M.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good quality and effective",
      review: "This Glass Cleaner works perfectly for windows and mirrors and is very convenient. The spray bottle design is practical and the cleaning power is good. Only minor issue is that it leaves slight streaks on very dirty surfaces, but still effective.",
      date: "November 28, 2024",
      productName: "Glass & Mirror Cleaner",
      productImage: "https://s.alicdn.com/@sc04/kf/H8420d36398fa4b8992b84ff23dcac060A.jpg_150x150.jpg",
      size: "500ml",
      color: "Blue",
      helpfulVotes: 11,
      totalVotes: 13,
      images: []
    },
    {
      id: 11,
      customerName: "Saira A.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Excellent kitchen degreaser",
      review: "This Kitchen Degreaser is so effective and powerful. Perfect for both daily cleaning and heavy-duty degreasing. Removes oil and grease stains effortlessly from stoves and countertops. Great value for money!",
      date: "November 26, 2024",
      productName: "Heavy Duty Kitchen Degreaser",
      productImage: "https://s.alicdn.com/@sc04/kf/H6d78604ad37b486396900db69d6801a4J.jpg_150x150.jpg",
      size: "500ml",
      color: "Yellow",
      helpfulVotes: 17,
      totalVotes: 19,
      images: []
    },
    {
      id: 12,
      customerName: "Farah B.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Professional quality at great price",
      review: "This All-Purpose Cleaner is absolutely fantastic! The cleaning power is professional-grade and works on multiple surfaces. Perfect for household and commercial use. The packaging was also very secure and hygienic.",
      date: "November 24, 2024",
      productName: "All-Purpose Multi-Surface Cleaner",
      productImage: "https://s.alicdn.com/@sc04/kf/H2582b15b162d4a718fc68c5e7522acc2J.png_150x150.jpg",
      size: "1L",
      color: "Green",
      helpfulVotes: 23,
      totalVotes: 25,
      images: [
        "https://s.alicdn.com/@sc04/kf/H2582b15b162d4a718fc68c5e7522acc2J.png_387x387.jpg"
      ]
    },
    {
      id: 13,
      customerName: "Uzma H.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Modern and effective formula",
      review: "This Carpet Cleaner is perfect for modern homes. The stain removal power is amazing and the fresh scent lasts for days. Great for high-traffic areas and pet stains. Highly satisfied with Marakish quality!",
      date: "November 22, 2024",
      productName: "Carpet & Upholstery Cleaner",
      productImage: "https://s.alicdn.com/@sc04/kf/Hb27ae62fe4b04d17ab0c24b8f153ec78m.jpg_150x150.jpg",
      size: "750ml",
      color: "Blue",
      helpfulVotes: 13,
      totalVotes: 15,
      images: []
    },
    {
      id: 14,
      customerName: "Mehreen K.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Complete cleaning solution kit",
      review: "This cleaning product bundle is absolutely perfect! The variety and quality are amazing for complete household cleaning. Perfect for deep cleaning during festivals and special occasions. Worth every penny!",
      date: "November 20, 2024",
      productName: "Complete Household Cleaning Kit",
      productImage: "https://s.alicdn.com/@sc04/kf/H6d78604ad37b486396900db69d6801a4J.jpg_150x150.jpg",
      size: "5-piece set",
      color: "Mixed",
      helpfulVotes: 28,
      totalVotes: 30,
      images: []
    },
    {
      id: 15,
      customerName: "Rubina S.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Effective and convenient",
      review: "This Drain Cleaner is perfect for regular maintenance and blockage removal. Works effectively on hair and soap buildup. The packaging is good and easy to use. Good quality for the price.",
      date: "November 18, 2024",
      productName: "Drain Unblocker Gel",
      productImage: "https://s.alicdn.com/@sc04/kf/HTB16VbPKeuSBuNjSsplq6ze8pXaD.jpg_150x150.jpg",
      size: "500ml",
      color: "Clear",
      helpfulVotes: 9,
      totalVotes: 11,
      images: []
    },
    {
      id: 16,
      customerName: "Shazia R.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Excellent stain remover quality",
      review: "This Stain Remover Spray is perfect for treating tough stains on clothes and fabrics. The pre-treatment formula works like magic on oil, food, and ink stains. Great for everyday use. Fast delivery from Marakish too!",
      date: "November 16, 2024",
      productName: "Pre-Treatment Stain Remover",
      productImage: "https://s.alicdn.com/@sc04/kf/Hb75a3ad8b49a4286b7bf7cf0d4355e5c6.jpg_150x150.jpg",
      size: "400ml",
      color: "Clear",
      helpfulVotes: 12,
      totalVotes: 14,
      images: []
    },
    {
      id: 17,
      customerName: "Tahira M.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Perfect for commercial use!",
      review: "This Industrial Strength Degreaser is absolutely outstanding! Perfect for heavy-duty commercial cleaning and tough grease removal. Works excellently in restaurant kitchens and workshops. Received excellent results every time!",
      date: "November 14, 2024",
      productName: "Industrial Strength Degreaser",
      productImage: "https://s.alicdn.com/@sc04/kf/H6d78604ad37b486396900db69d6801a4J.jpg_150x150.jpg",
      size: "5L",
      color: "Yellow",
      helpfulVotes: 20,
      totalVotes: 22,
      images: [
        "https://s.alicdn.com/@sc04/kf/H6d78604ad37b486396900db69d6801a4J.jpg_387x387.jpg"
      ]
    },
    {
      id: 18,
      customerName: "Yasmin A.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Ultra fresh air freshener",
      review: "This Air Freshener is incredibly effective and long-lasting! Perfect for eliminating odors and maintaining fresh indoor air. The scent is pleasant and not overwhelming. Great for bathrooms and living areas.",
      date: "November 12, 2024",
      productName: "Long-Lasting Air Freshener",
      productImage: "https://s.alicdn.com/@sc04/kf/Hae4319cb230b401397bd3f532ee9596ac.png_150x150.jpg",
      size: "300ml",
      color: "Purple",
      helpfulVotes: 8,
      totalVotes: 10,
      images: []
    },
    {
      id: 19,
      customerName: "Samina K.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good for daily use",
      review: "This Multi-Purpose Disinfectant is suitable for daily cleaning and sanitizing. The formula is effective and the price is reasonable. The antimicrobial action is good for regular household hygiene maintenance.",
      date: "November 10, 2024",
      productName: "Multi-Purpose Disinfectant",
      productImage: "https://s.alicdn.com/@sc04/kf/HTB1VjW3RpXXXXXJXFXX760XFXXXW.png_150x150.jpg",
      size: "1L",
      color: "Clear",
      helpfulVotes: 7,
      totalVotes: 9,
      images: []
    },
    {
      id: 20,
      customerName: "Naila H.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Classic Washing Powder is excellent",
      review: "This Classic Washing Powder is absolutely reliable! The traditional cleaning power is unique and the stain removal is outstanding. Great authentic cleaning action and fast shipping from Marakish. Love it!",
      date: "November 8, 2024",
      productName: "Classic Washing Powder",
      productImage: "https://s.alicdn.com/@sc04/kf/Hb27ae62fe4b04d17ab0c24b8f153ec78m.jpg_150x150.jpg",
      size: "2kg",
      color: "White",
      helpfulVotes: 15,
      totalVotes: 17,
      images: []
    },
    {
      id: 21,
      customerName: "Bushra S.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Simple and effective",
      review: "This Simple Dish Soap is perfect for those who love gentle yet effective cleaning. The formulation is clean and efficient. Great quality ingredients and comfortable on hands. Exactly what I was looking for!",
      date: "November 6, 2024",
      productName: "Gentle Dish Soap",
      productImage: "https://s.alicdn.com/@sc04/kf/H966febf11edc4517a83767f5773bf9cbd.png_150x150.jpg",
      size: "500ml",
      color: "Clear",
      helpfulVotes: 10,
      totalVotes: 12,
      images: []
    },
    {
      id: 22,
      customerName: "Fouzia R.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Premium cleaning kit stunning!",
      review: "This Premium Professional Cleaning Kit is absolutely exquisite! The variety of cleaners and perfect packaging are amazing for comprehensive cleaning and professional use. The quality is outstanding. Worth the investment!",
      date: "November 4, 2024",
      productName: "Premium Professional Cleaning Kit",
      productImage: "https://s.alicdn.com/@sc04/kf/H2582b15b162d4a718fc68c5e7522acc2J.png_150x150.jpg",
      size: "10-piece kit",
      color: "Mixed",
      helpfulVotes: 32,
      totalVotes: 34,
      images: [
        "https://s.alicdn.com/@sc04/kf/H2582b15b162d4a718fc68c5e7522acc2J.png_387x387.jpg",
        "https://s.alicdn.com/@sc04/kf/Hba091f94c4cc4002ab237b7e923a1ca1z.jpg_388x388.jpg"
      ]
    },
    {
      id: 23,
      customerName: "Riffat M.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Perfect for office cleaning",
      review: "This Office Cleaning Pack is efficient yet thorough, perfect for workplace cleaning and maintenance. The variety is practical and the effectiveness is excellent. Great for corporate environments. Highly recommend Marakish!",
      date: "November 2, 2024",
      productName: "Office Cleaning Essentials Pack",
      productImage: "https://s.alicdn.com/@sc04/kf/H6d78604ad37b486396900db69d6801a4J.jpg_150x150.jpg",
      size: "6-piece set",
      color: "Blue",
      helpfulVotes: 14,
      totalVotes: 16,
      images: []
    },
    {
      id: 24,
      customerName: "Shaista K.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Traditional and effective",
      review: "This Traditional Soap Bar collection with natural ingredients is effective and authentic. The quality is excellent and the cleaning power is timeless. Perfect for maintaining traditional cleaning methods and eco-friendly practices.",
      date: "October 31, 2024",
      productName: "Natural Soap Bar Collection",
      productImage: "https://s.alicdn.com/@sc04/kf/Hae4319cb230b401397bd3f532ee9596ac.png_150x150.jpg",
      size: "4-bar pack",
      color: "Natural",
      helpfulVotes: 18,
      totalVotes: 20,
      images: []
    },
    {
      id: 25,
      customerName: "Nayab A.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Commercial grade cleaning perfect",
      review: "This Commercial Grade Cleaning Kit is perfect for business facilities and industrial cleaning. The concentration is professional and the quality is high. Great variety and excellent customer service from Marakish. Very satisfied!",
      date: "October 29, 2024",
      productName: "Commercial Grade Cleaning Kit",
      productImage: "https://s.alicdn.com/@sc04/kf/HTB16VbPKeuSBuNjSsplq6ze8pXaD.jpg_150x150.jpg",
      size: "15L total",
      color: "Industrial",
      helpfulVotes: 16,
      totalVotes: 18,
      images: []
    },
    {
      id: 26,
      customerName: "Ghazala S.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good quality, minor scent preference",
      review: "The quality is good and the cleaning power is effective. However, the fragrance was slightly stronger for my preference. Overall satisfied with the purchase. The cleaning results are perfect and the consistency is good.",
      date: "October 27, 2024",
      productName: "Scented Bathroom Cleaner",
      productImage: "https://s.alicdn.com/@sc04/kf/Hba091f94c4cc4002ab237b7e923a1ca1z.jpg_150x150.jpg",
      size: "750ml",
      color: "Pink",
      helpfulVotes: 6,
      totalVotes: 8,
      images: []
    },
    {
      id: 27,
      customerName: "Lubna R.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Amazing quality and effectiveness",
      review: "The quality of these eco-friendly cleaning products is absolutely amazing! The attention to environmental safety is incredible. Perfect for households with children and pets. The cleaning effectiveness is exceptional. Highly recommend Marakish!",
      date: "October 25, 2024",
      productName: "Eco-Friendly Cleaning Products",
      productImage: "https://s.alicdn.com/@sc04/kf/H8420d36398fa4b8992b84ff23dcac060A.jpg_150x150.jpg",
      size: "5-product set",
      color: "Green",
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
                        className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-800 transition-colors duration-200"
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
                  ? 'bg-red-600 text-white border-red-600'
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
                    ? 'bg-red-600 text-white border-red-600'
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
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                    <Link href={`/product/${review.id}`} className="text-red-600 hover:text-red-800 text-sm">
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
                      <button className="text-red-600 hover:text-red-800 transition-colors duration-200">
                        Helpful
                      </button>
                      <span className="text-gray-400">|</span>
                      <button className="text-red-600 hover:text-red-800 transition-colors duration-200">
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
              className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg"
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