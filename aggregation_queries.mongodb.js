//Total Post per Platform
db.posts.aggregate([
  {
    $group: {
      _id: "$Platform",
      total_posts: { $sum: 1 }
    }
  },
  {
    $sort: { total_posts: -1 }
  }
])


//Rata-rata Likes per Platform
db.posts.aggregate([
  {
    $group: {
      _id: "$Platform",
      avg_likes: { $avg: "$Likes" }
    }
  },
  {
    $sort: { avg_likes: -1 }
  }
])


//Total Interaksi per Platform
db.posts.aggregate([
  {
    $project: {
      Platform: 1,
      total_interaction: {
        $add: ["$Likes", "$Replies", "$Shares"]
      }
    }
  },
  {
    $group: {
      _id: "$Platform",
      total_interaction: { $sum: "$total_interaction" }
    }
  },
  {
    $sort: { total_interaction: -1 }
  }
])


//Total Interaksi per Platform
db.posts.aggregate([
  {
    $project: {
      Platform: 1,
      total_interaction: {
        $add: ["$Likes", "$Replies", "$Shares"]
      }
    }
  },
  {
    $group: {
      _id: "$Platform",
      total_interaction: { $sum: "$total_interaction" }
    }
  },
  {
    $sort: { total_interaction: -1 }
  }
])


//Distribusi Sentimen Konten
db.posts.aggregate([
  {
    $group: {
      _id: "$Sentiment",
      total_posts: { $sum: 1 }
    }
  }
])


//Engagement Berdasarkan Sentimen
db.posts.aggregate([
  {
    $group: {
      _id: "$Sentiment",
      avg_likes: { $avg: "$Likes" },
      avg_replies: { $avg: "$Replies" },
      avg_shares: { $avg: "$Shares" }
    }
  }
])


//Top 5 Post dengan Likes Tertinggi
db.posts.aggregate([
  {
    $sort: { Likes: -1 }
  },
  {
    $limit: 5
  },
  {
    $project: {
      _id: 0,
      Platform: 1,
      Likes: 1,
      Feedback_Text: 1
    }
  }
])


//Rata-rata Aktivitas User per Platform
db.posts.aggregate([
  {
    $group: {
      _id: "$Platform",
      avg_user_activity: { $avg: "$User_Activity_Score" }
    }
  },
  {
    $sort: { avg_user_activity: -1 }
  }
])
