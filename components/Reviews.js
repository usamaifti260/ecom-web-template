import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Reviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('most-recent');
  const [reviewsToShow, setReviewsToShow] = useState(4);

  // Sample product reviews data - Sweet shop style (27 reviews for 4.8 rating)
  const reviews = [
    {
      id: 1,
      customerName: "Fatima A.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Best Khoya Barfi in town!",
      review: "This Khoya Barfi exceeded my expectations. The taste is incredible and the freshness is amazing. Perfect for special occasions and family gatherings. The sweetness level is just right and melts in your mouth. Highly recommend for sweet lovers.",
      date: "December 15, 2024",
      productName: "Premium Khoya Barfi",
      productImage: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=150&auto=format&fit=crop&q=60",
      size: "500g",
      color: "Silver",
      helpfulVotes: 12,
      totalVotes: 14,
      images: [
        "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=387&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1603894584373-5ac82605b9ee?w=388&auto=format&fit=crop&q=60"
      ]
    },
    {
      id: 2,
      customerName: "Ahmad H.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Outstanding Sohan Halwa!",
      review: "The Sohan Halwa is absolutely outstanding! The quality is excellent and the taste is perfect. The traditional recipe is authentic and brings back childhood memories. Perfect for festivals and celebrations. Great value for money!",
      date: "December 14, 2024",
      productName: "Sohan Halwa - Badami",
      productImage: "https://images.unsplash.com/photo-1603894584373-5ac82605b9ee?w=150&auto=format&fit=crop&q=60",
      size: "250g",
      color: "Golden",
      helpfulVotes: 18,
      totalVotes: 20,
      images: []
    },
    {
      id: 3,
      customerName: "Ayesha M.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Pure Desi Ghee is amazing!",
      review: "This pure desi ghee is exactly what I was looking for. The aroma is divine and the taste is authentic. Perfect for cooking and traditional sweets. The quality is excellent and you can taste the purity. Fast delivery too!",
      date: "December 12, 2024",
      productName: "Pure Cow Desi Ghee",
      productImage: "https://images.unsplash.com/photo-1628288309058-4bc21cf48090?w=150&auto=format&fit=crop&q=60",
      size: "1kg",
      color: "Golden",
      helpfulVotes: 15,
      totalVotes: 16,
      images: [
        "https://images.unsplash.com/photo-1628288309058-4bc21cf48090?w=435&auto=format&fit=crop&q=60"
      ]
    },
    {
      id: 4,
      customerName: "Maria K.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Delicious Gulab Jamun!",
      review: "These Gulab Jamuns are perfect for my family gatherings. Traditional taste and excellent sweetness. The syrup is perfectly balanced and the texture is soft. Excellent quality and fast delivery from AlHafiz Milk and Sweets.",
      date: "December 10, 2024",
      productName: "Traditional Gulab Jamun",
      productImage: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&auto=format&fit=crop&q=60",
      size: "12 pieces",
      color: "Brown",
      helpfulVotes: 22,
      totalVotes: 24,
      images: []
    },
    {
      id: 5,
      customerName: "Zara L.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Fresh milk is excellent!",
      review: "This fresh milk is so pure and creamy! I can taste the difference compared to packaged milk. The taste is natural and the quality is amazing. Great for making traditional sweets at home. Will definitely order more from AlHafiz.",
      date: "December 8, 2024",
      productName: "Fresh Cow Milk",
      productImage: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150&auto=format&fit=crop&q=60",
      size: "1 liter",
      color: "White",
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
      review: "The product quality is very good for the price. Delivery was faster than expected and the packaging was excellent. The Kaju Barfi tastes fresh and melts perfectly. Satisfied with my purchase.",
      date: "December 6, 2024",
      productName: "Kaju Barfi",
      productImage: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=150&auto=format&fit=crop&q=60",
      size: "250g",
      color: "Silver",
      helpfulVotes: 14,
      totalVotes: 16,
      images: []
    },
    {
      id: 7,
      customerName: "Sadia S.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Beautiful Sohan Halwa Mix!",
      review: "The Mix Dry Fruit Sohan Halwa is absolutely stunning! The variety of nuts and the perfect sweetness are remarkable. Perfect for special occasions. The quality is premium and the taste is excellent. Highly recommend for celebrations!",
      date: "December 4, 2024",
      productName: "Sohan Halwa - Mix Dry Fruit",
      productImage: "https://images.unsplash.com/photo-1603894584373-5ac82605b9ee?w=150&auto=format&fit=crop&q=60",
      size: "500g",
      color: "Mixed",
      helpfulVotes: 25,
      totalVotes: 27,
      images: [
        "https://images.unsplash.com/photo-1603894584373-5ac82605b9ee?w=387&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=388&auto=format&fit=crop&q=60"
      ]
    },
    {
      id: 8,
      customerName: "Rabia K.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Exceeded expectations!",
      review: "This Rasgulla pack is even better than I expected. The sweets are soft and spongy, perfect for dessert after meals. The syrup is perfectly sweet and the texture is amazing. Great customer service from AlHafiz too!",
      date: "December 2, 2024",
      productName: "Traditional Rasgulla",
      productImage: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&auto=format&fit=crop&q=60",
      size: "8 pieces",
      color: "White",
      helpfulVotes: 16,
      totalVotes: 18,
      images: []
    },
    {
      id: 9,
      customerName: "Amina T.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Premium quality sweets",
      review: "The sweet quality is outstanding! This Jalebi set is perfect for festivals and celebrations. The crispiness is perfect and the syrup coating is excellent. Received many compliments from guests when I served them.",
      date: "November 30, 2024",
      productName: "Crispy Jalebi",
      productImage: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&auto=format&fit=crop&q=60",
      size: "300g",
      color: "Orange",
      helpfulVotes: 21,
      totalVotes: 23,
      images: []
    },
    {
      id: 10,
      customerName: "Khadija M.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good quality and fresh",
      review: "This Kheer mix fits perfectly for family desserts and is very convenient. The taste is authentic and the preparation is simple. Only minor issue is that the sweetness was slightly different than expected, but still delicious.",
      date: "November 28, 2024",
      productName: "Kheer Mix",
      productImage: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150&auto=format&fit=crop&q=60",
      size: "200g",
      color: "Cream",
      helpfulVotes: 11,
      totalVotes: 13,
      images: []
    },
    {
      id: 11,
      customerName: "Saira A.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Beautiful and tasty laddu",
      review: "These Besan Laddu are so elegant and delicious. Perfect for both daily consumption and special celebrations. The gram flour is high quality and the ghee taste is authentic. Great value for money!",
      date: "November 26, 2024",
      productName: "Besan Laddu",
      productImage: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&auto=format&fit=crop&q=60",
      size: "6 pieces",
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
      review: "This Malai Khoya is absolutely gorgeous! The texture is creamy and the taste is authentic. Perfect for making homemade sweets. The packaging was also very nice and hygienic.",
      date: "November 24, 2024",
      productName: "Fresh Malai Khoya",
      productImage: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150&auto=format&fit=crop&q=60",
      size: "500g",
      color: "White",
      helpfulVotes: 23,
      totalVotes: 25,
      images: [
        "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=387&auto=format&fit=crop&q=60"
      ]
    },
    {
      id: 13,
      customerName: "Uzma H.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Modern and traditional taste",
      review: "These Coconut Barfi are perfect for modern celebrations. The quality is contemporary and the coconut flavor is amazing. Great for parties and festivals. Highly satisfied with AlHafiz Milk and Sweets!",
      date: "November 22, 2024",
      productName: "Coconut Barfi",
      productImage: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=150&auto=format&fit=crop&q=60",
      size: "250g",
      color: "White",
      helpfulVotes: 13,
      totalVotes: 15,
      images: []
    },
    {
      id: 14,
      customerName: "Mehreen K.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Premium festival sweets",
      review: "This festival sweet box is absolutely beautiful! The variety and presentation are amazing and the sweet quality is premium. Perfect for gifting during Eid and other celebrations. Worth every penny!",
      date: "November 20, 2024",
      productName: "Festival Sweet Box",
      productImage: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&auto=format&fit=crop&q=60",
      size: "1kg Mixed",
      color: "Assorted",
      helpfulVotes: 28,
      totalVotes: 30,
      images: []
    },
    {
      id: 15,
      customerName: "Rubina S.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Fresh and convenient",
      review: "This yogurt is perfect for daily consumption and cooking. The taste is fresh and consistent. The packaging is good. The sourness is exactly as expected. Good quality for the price.",
      date: "November 18, 2024",
      productName: "Fresh Yogurt",
      productImage: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150&auto=format&fit=crop&q=60",
      size: "500ml",
      color: "White",
      helpfulVotes: 9,
      totalVotes: 11,
      images: []
    },
    {
      id: 16,
      customerName: "Shazia R.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Excellent cream quality",
      review: "This fresh cream is perfect for making desserts and sweets. The texture is smooth and the taste is rich. Great for everyday use. Fast delivery from AlHafiz Milk and Sweets too!",
      date: "November 16, 2024",
      productName: "Fresh Cream",
      productImage: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150&auto=format&fit=crop&q=60",
      size: "250ml",
      color: "White",
      helpfulVotes: 12,
      totalVotes: 14,
      images: []
    },
    {
      id: 17,
      customerName: "Tahira M.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Perfect for special occasions!",
      review: "This Sohan Halwa Akhroti is absolutely stunning! The walnut pieces are perfectly distributed and the taste is divine. Perfect for wedding celebrations and special events. Received so many compliments!",
      date: "November 14, 2024",
      productName: "Sohan Halwa - Akhroti",
      productImage: "https://images.unsplash.com/photo-1603894584373-5ac82605b9ee?w=150&auto=format&fit=crop&q=60",
      size: "500g",
      color: "Golden",
      helpfulVotes: 20,
      totalVotes: 22,
      images: [
        "https://images.unsplash.com/photo-1603894584373-5ac82605b9ee?w=387&auto=format&fit=crop&q=60"
      ]
    },
    {
      id: 18,
      customerName: "Yasmin A.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Ultra fresh buffalo ghee",
      review: "This buffalo ghee is incredibly pure and aromatic! Perfect for traditional cooking and making authentic sweets. The taste is rich and the quality is excellent. Great for everyday cooking use.",
      date: "November 12, 2024",
      productName: "Pure Buffalo Ghee",
      productImage: "https://images.unsplash.com/photo-1628288309058-4bc21cf48090?w=150&auto=format&fit=crop&q=60",
      size: "500g",
      color: "Golden",
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
      review: "This mixed ghee is suitable for daily cooking and baking. The taste is good and the price is reasonable. The aroma is pleasant and the quality is decent for regular household use.",
      date: "November 10, 2024",
      productName: "Mixed Ghee",
      productImage: "https://images.unsplash.com/photo-1628288309058-4bc21cf48090?w=150&auto=format&fit=crop&q=60",
      size: "1kg",
      color: "Golden",
      helpfulVotes: 7,
      totalVotes: 9,
      images: []
    },
    {
      id: 20,
      customerName: "Naila H.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Classic Sohan Halwa is excellent",
      review: "This classic Sohan Halwa Sada is absolutely beautiful! The traditional taste is unique and the classic preparation is outstanding. Great authentic flavor and fast shipping from AlHafiz. Love it!",
      date: "November 8, 2024",
      productName: "Sohan Halwa - Sada",
      productImage: "https://images.unsplash.com/photo-1603894584373-5ac82605b9ee?w=150&auto=format&fit=crop&q=60",
      size: "250g",
      color: "Golden",
      helpfulVotes: 15,
      totalVotes: 17,
      images: []
    },
    {
      id: 21,
      customerName: "Bushra S.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Minimalist and pure",
      review: "This simple Khoya Barfi is perfect for those who love traditional taste. The preparation is clean and elegant. Great quality ingredients and comfortable sweetness. Exactly what I was looking for!",
      date: "November 6, 2024",
      productName: "Plain Khoya Barfi",
      productImage: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=150&auto=format&fit=crop&q=60",
      size: "250g",
      color: "White",
      helpfulVotes: 10,
      totalVotes: 12,
      images: []
    },
    {
      id: 22,
      customerName: "Fouzia R.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Premium gift box stunning!",
      review: "This premium sweet gift box is absolutely exquisite! The variety of sweets and perfect presentation are amazing for special occasions and gifting. The packaging is outstanding. Worth the investment!",
      date: "November 4, 2024",
      productName: "Premium Sweet Gift Box",
      productImage: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&auto=format&fit=crop&q=60",
      size: "2kg Mixed",
      color: "Assorted",
      helpfulVotes: 32,
      totalVotes: 34,
      images: [
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=387&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=388&auto=format&fit=crop&q=60"
      ]
    },
    {
      id: 23,
      customerName: "Riffat M.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Perfect for parties",
      review: "This party sweet pack is light yet satisfying, perfect for celebrations and gatherings. The variety is practical and the taste is excellent. Great for family events. Highly recommend AlHafiz Milk and Sweets!",
      date: "November 2, 2024",
      productName: "Party Sweet Pack",
      productImage: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&auto=format&fit=crop&q=60",
      size: "1kg",
      color: "Mixed",
      helpfulVotes: 14,
      totalVotes: 16,
      images: []
    },
    {
      id: 24,
      customerName: "Shaista K.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Traditional and authentic",
      review: "This traditional sweet collection with cultural heritage is beautiful and authentic. The quality is excellent and the taste is timeless. Perfect for preserving our sweet traditions and family celebrations.",
      date: "October 31, 2024",
      productName: "Traditional Sweet Collection",
      productImage: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&auto=format&fit=crop&q=60",
      size: "500g Mixed",
      color: "Traditional",
      helpfulVotes: 18,
      totalVotes: 20,
      images: []
    },
    {
      id: 25,
      customerName: "Nayab A.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Executive sweet hamper perfect",
      review: "This executive sweet hamper is perfect for corporate gifting and business occasions. The presentation is professional and the quality is high. Great variety and excellent customer service from AlHafiz. Very satisfied!",
      date: "October 29, 2024",
      productName: "Executive Sweet Hamper",
      productImage: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&auto=format&fit=crop&q=60",
      size: "1.5kg",
      color: "Premium",
      helpfulVotes: 16,
      totalVotes: 18,
      images: []
    },
    {
      id: 26,
      customerName: "Ghazala S.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good quality, minor preference",
      review: "The quality is good and the taste is nice. However, the sweetness was slightly higher for my preference. Overall satisfied with the purchase. The texture is perfect and the freshness is good.",
      date: "October 27, 2024",
      productName: "Sweet Samosa",
      productImage: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&auto=format&fit=crop&q=60",
      size: "6 pieces",
      color: "Golden",
      helpfulVotes: 6,
      totalVotes: 8,
      images: []
    },
    {
      id: 27,
      customerName: "Lubna R.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Amazing craftsmanship and taste",
      review: "The craftsmanship on these handmade sweets is absolutely amazing! The attention to detail is incredible. Perfect for special celebrations and premium gifting. The taste quality is exceptional. Highly recommend AlHafiz Milk and Sweets!",
      date: "October 25, 2024",
      productName: "Handmade Premium Sweets",
      productImage: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&auto=format&fit=crop&q=60",
      size: "750g",
      color: "Artisan",
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