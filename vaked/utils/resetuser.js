const User = require("../schema/userSchema");

const getISTTime = () => {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
};

const resetUnsubmittedUsers = async () => {
  try {
    const today = getISTTime().toISOString().split("T")[0];

    const users = await User.find({ "payment.status": "completed" });

    for (let user of users) {
      const todayProgress = user.progress.find((p) => p.date === today);

      const isIncomplete = !todayProgress || !todayProgress.manifestation || !todayProgress.contentLink;

      if (isIncomplete) {
        user.progress = [];
        user.payment.status = "not_started";
        await user.save();
        console.log(`⛔ Reset progress for ${user.email}`);
      }
    }

    console.log("✅ Daily reset completed");
  } catch (err) {
    console.error("❌ Reset failed:", err.message);
  }
};

module.exports = resetUnsubmittedUsers;
