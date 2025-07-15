import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Reviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('most-recent');
  const [reviewsToShow, setReviewsToShow] = useState(4);

  // Sample product reviews data - Amazon style (27 reviews for 4.8 rating)
  const reviews = [
    {
      id: 1,
      customerName: "Ayesha K.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Perfect for my daughter's wedding!",
      review: "This 3-piece suit exceeded my expectations. The embroidery work is absolutely stunning and the fabric quality is premium. I received so many compliments at the wedding. The dupatta is beautifully crafted and the fit is perfect. Highly recommend for special occasions.",
      date: "December 15, 2024",
      productName: "Elegant Embroidered 3 Piece Suit",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
      size: "Medium",
      color: "Pink",
      helpfulVotes: 12,
      totalVotes: 14,
      images: [
        "https://plus.unsplash.com/premium_photo-1673481601147-ee95199d3896?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1529636273736-fc88b31ea9d9?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    },
    {
      id: 2,
      customerName: "Fatima A.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Absolutely love this co-ord set!",
      review: "The fabric is so comfortable and the stitching is excellent. Perfect fit and beautiful colors. I've worn it multiple times and always get compliments. Great value for money!",
      date: "December 14, 2024",
      productName: "Stylish Co-ord Set",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
      size: "Large",
      color: "Navy",
      helpfulVotes: 18,
      totalVotes: 20,
      images: []
    },
    {
      id: 3,
      customerName: "Zara M.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Authentic Pakistani design - Love it!",
      review: "This kameez shalwar is exactly what I was looking for. The traditional embroidery is beautiful and authentic. Perfect for Eid celebrations. The dupatta is gorgeous and the overall quality is excellent. Fast shipping too!",
      date: "December 12, 2024",
      productName: "Traditional Kameez Shalwar",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
      size: "Small",
      color: "Red",
      helpfulVotes: 15,
      totalVotes: 16,
      images: [
        "https://images.unsplash.com/flagged/photo-1585052201332-b8c0ce30972f?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    },
    {
      id: 4,
      customerName: "Mariam H.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Perfect for office wear",
      review: "This 2-piece outfit is perfect for my office environment. Professional look and comfortable to wear all day. The fabric doesn't wrinkle easily which is great. Excellent quality and fast delivery.",
      date: "December 10, 2024",
      productName: "Chic 2 Piece Outfit",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
      size: "Medium",
      color: "Purple",
      helpfulVotes: 22,
      totalVotes: 24,
      images: []
    },
    {
      id: 5,
      customerName: "Sana L.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Versatile and elegant",
      review: "This 1-piece dress is so versatile! I can dress it up for formal events or down for casual outings. The fabric is high quality and the fit is flattering. Great value for money. Will definitely order more from Hathkari.",
      date: "December 8, 2024",
      productName: "Graceful 1 Piece Dress",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135844.png",
      size: "Large",
      color: "Yellow",
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
      review: "The product quality is very good for the price. Delivery was faster than expected and the packaging was excellent. The outfit fits well and looks exactly like the photos. Satisfied with my purchase.",
      date: "December 6, 2024",
      productName: "Premium Kameez Shalwar",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      size: "Medium",
      color: "Blue",
      helpfulVotes: 14,
      totalVotes: 16,
      images: []
    },
    {
      id: 7,
      customerName: "Nadia S.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Beautiful embroidery work",
      review: "The embroidery on this 3-piece is absolutely stunning! The attention to detail is remarkable. Perfect for special occasions. The fabric quality is premium and the fit is excellent. Highly recommend!",
      date: "December 4, 2024",
      productName: "Festive 3 Piece Collection",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
      size: "Small",
      color: "Gold",
      helpfulVotes: 25,
      totalVotes: 27,
      images: [
        "https://images.unsplash.com/photo-1583391733956-6c78276477e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
      ]
    },
    {
      id: 8,
      customerName: "Rabia K.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Exceeded expectations!",
      review: "This co-ord set is even better than I expected. The fabric is soft and comfortable, perfect for daily wear. The color is vibrant and the stitching is impeccable. Great customer service too!",
      date: "December 2, 2024",
      productName: "Casual Co-ord Set",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
      size: "Medium",
      color: "Beige",
      helpfulVotes: 16,
      totalVotes: 18,
      images: []
    },
    {
      id: 9,
      customerName: "Amina T.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Premium quality fabric",
      review: "The fabric quality is outstanding! This kameez shalwar is perfect for formal events. The embroidery is intricate and beautiful. Received many compliments when I wore it to a wedding.",
      date: "November 30, 2024",
      productName: "Premium Kameez Shalwar",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
      size: "Large",
      color: "Royal Blue",
      helpfulVotes: 21,
      totalVotes: 23,
      images: []
    },
    {
      id: 10,
      customerName: "Khadija M.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good fit and comfortable",
      review: "This 2-piece outfit fits perfectly and is very comfortable. The fabric is breathable and the design is modern. Only minor issue is that the color was slightly different from the photo, but still beautiful.",
      date: "November 28, 2024",
      productName: "Modern 2 Piece Set",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135844.png",
      size: "Small",
      color: "Coral",
      helpfulVotes: 11,
      totalVotes: 13,
      images: []
    },
    {
      id: 11,
      customerName: "Saira A.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Beautiful and elegant",
      review: "This 1-piece kurta is so elegant and comfortable. Perfect for both casual and formal occasions. The fabric is high quality and the fit is flattering. Great value for money!",
      date: "November 26, 2024",
      productName: "Elegant 1 Piece Kurta",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      size: "Medium",
      color: "White",
      helpfulVotes: 17,
      totalVotes: 19,
      images: []
    },
    {
      id: 12,
      customerName: "Farah B.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Designer quality at great price",
      review: "This designer 3-piece suit is absolutely gorgeous! The fabric is premium and the embroidery work is exquisite. Perfect for special occasions. The packaging was also very nice.",
      date: "November 24, 2024",
      productName: "Designer 3 Piece Suit",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
      size: "Large",
      color: "Deep Purple",
      helpfulVotes: 23,
      totalVotes: 25,
      images: [
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
      ]
    },
    {
      id: 13,
      customerName: "Uzma H.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Trendy and stylish",
      review: "This trendy co-ord set is perfect for modern women. The style is contemporary and the fabric is comfortable. Great for casual outings and office wear. Highly satisfied!",
      date: "November 22, 2024",
      productName: "Trendy Co-ord Collection",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
      size: "Small",
      color: "Turquoise",
      helpfulVotes: 13,
      totalVotes: 15,
      images: []
    },
    {
      id: 14,
      customerName: "Mehreen K.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Luxury quality",
      review: "This luxury kameez shalwar set is absolutely beautiful! The handcrafted details are amazing and the fabric quality is premium. Perfect for special events. Worth every penny!",
      date: "November 20, 2024",
      productName: "Luxury Kameez Shalwar Set",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
      size: "Medium",
      color: "Midnight Blue",
      helpfulVotes: 28,
      totalVotes: 30,
      images: []
    },
    {
      id: 15,
      customerName: "Rubina S.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Professional and comfortable",
      review: "This sophisticated 2-piece is perfect for professional settings. The fabric is comfortable and the fit is good. The color is exactly as shown in photos. Good quality for the price.",
      date: "November 18, 2024",
      productName: "Sophisticated 2 Piece",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135844.png",
      size: "Large",
      color: "Charcoal",
      helpfulVotes: 9,
      totalVotes: 11,
      images: []
    },
    {
      id: 16,
      customerName: "Shazia R.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Stylish and modern",
      review: "This stylish 1-piece tunic is perfect for casual wear. The modern cuts are flattering and the fabric is comfortable. Great for everyday wear. Fast delivery too!",
      date: "November 16, 2024",
      productName: "Stylish 1 Piece Tunic",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      size: "Small",
      color: "Lavender",
      helpfulVotes: 12,
      totalVotes: 14,
      images: []
    },
    {
      id: 17,
      customerName: "Tahira M.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Perfect for parties!",
      review: "This party wear 3-piece set is absolutely stunning! The glamorous design is perfect for special events. The fabric is luxurious and the fit is perfect. Received so many compliments!",
      date: "November 14, 2024",
      productName: "Party Wear 3 Piece",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
      size: "Medium",
      color: "Champagne",
      helpfulVotes: 20,
      totalVotes: 22,
      images: [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
      ]
    },
    {
      id: 18,
      customerName: "Yasmin A.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Ultra comfortable",
      review: "This comfort co-ord set is incredibly comfortable! Perfect for lounging and casual outings. The fabric is soft and the fit is relaxed. Great for everyday wear.",
      date: "November 12, 2024",
      productName: "Comfort Co-ord Set",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
      size: "Large",
      color: "Light Gray",
      helpfulVotes: 8,
      totalVotes: 10,
      images: []
    },
    {
      id: 19,
      customerName: "Samina K.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good for formal occasions",
      review: "This formal kameez shalwar is suitable for office and business meetings. The fabric is professional and the fit is good. The color is elegant and the quality is decent.",
      date: "November 10, 2024",
      productName: "Formal Kameez Shalwar",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
      size: "Medium",
      color: "Black",
      helpfulVotes: 7,
      totalVotes: 9,
      images: []
    },
    {
      id: 20,
      customerName: "Naila H.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Vintage style is beautiful",
      review: "This vintage-inspired 2-piece set is absolutely beautiful! The retro patterns are unique and the classic cuts are flattering. Great quality and fast shipping. Love it!",
      date: "November 8, 2024",
      productName: "Vintage 2 Piece Set",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135844.png",
      size: "Small",
      color: "Burgundy",
      helpfulVotes: 15,
      totalVotes: 17,
      images: []
    },
    {
      id: 21,
      customerName: "Bushra S.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Minimalist and elegant",
      review: "This minimalist 1-piece dress is perfect for those who love simplicity. The design is clean and elegant. Great quality fabric and comfortable fit. Exactly what I was looking for!",
      date: "November 6, 2024",
      productName: "Minimalist 1 Piece",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      size: "Medium",
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
      title: "Bridal collection is stunning!",
      review: "This bridal 3-piece collection is absolutely exquisite! The heavy embroidery and premium finish are perfect for weddings. The craftsmanship is outstanding. Worth the investment!",
      date: "November 4, 2024",
      productName: "Bridal 3 Piece Collection",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
      size: "Large",
      color: "Deep Red",
      helpfulVotes: 32,
      totalVotes: 34,
      images: [
        "https://images.unsplash.com/photo-1583391733956-6c78276477e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
      ]
    },
    {
      id: 23,
      customerName: "Riffat M.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Perfect for summer",
      review: "This summer co-ord set is light and breezy, perfect for hot weather. The fabric is breathable and the colors are vibrant. Great for casual summer outings. Highly recommend!",
      date: "November 2, 2024",
      productName: "Summer Co-ord Set",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
      size: "Small",
      color: "Sky Blue",
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
      review: "This traditional kameez shalwar with cultural motifs is beautiful and authentic. The quality is excellent and the design is timeless. Perfect for cultural events and festivals.",
      date: "October 31, 2024",
      productName: "Traditional Kameez Shalwar",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
      size: "Medium",
      color: "Green",
      helpfulVotes: 18,
      totalVotes: 20,
      images: []
    },
    {
      id: 25,
      customerName: "Nayab A.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Executive style is perfect",
      review: "This executive 2-piece is perfect for business and formal occasions. The style is professional and the fabric is high quality. Great fit and excellent customer service. Very satisfied!",
      date: "October 29, 2024",
      productName: "Executive 2 Piece",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135844.png",
      size: "Large",
      color: "Navy Blue",
      helpfulVotes: 16,
      totalVotes: 18,
      images: []
    },
    {
      id: 26,
      customerName: "Ghazala S.",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good quality, minor fitting issue",
      review: "The quality is good and the design is nice. However, the fit was slightly loose for my size. Overall satisfied with the purchase. The fabric is comfortable and the color is beautiful.",
      date: "October 27, 2024",
      productName: "Stylish Co-ord Set",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      size: "Medium",
      color: "Navy",
      helpfulVotes: 6,
      totalVotes: 8,
      images: []
    },
    {
      id: 27,
      customerName: "Lubna R.",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Amazing embroidery work",
      review: "The embroidery work on this 3-piece suit is absolutely amazing! The attention to detail is incredible. Perfect for weddings and special occasions. The fabric quality is premium. Highly recommend!",
      date: "October 25, 2024",
      productName: "Elegant Embroidered 3 Piece Suit",
      productImage: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
      size: "Small",
      color: "Pink",
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
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  selectedFilter === 'all'
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
                  className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    selectedFilter === star.toString()
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
                      <span>Color: {review.color}</span>
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