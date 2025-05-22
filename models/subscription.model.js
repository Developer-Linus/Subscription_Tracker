import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [100, "Name must be at most 100 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be at least 0"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ["USD", "EUR", "GBP"],
      default: "USD",
    },
    frequency: {
      type: String,
      required: [true, "Frequency is required"],
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: "monthly",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "business",
        "personal",
        "entertainment",
        "health",
        "travel",
        "food",
        "other",
      ],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: ["credit card", "debit card", "paypal", "bank transfer"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: (value) => value <= Date.now(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      required: false,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to run before saving a subscription document
subscriptionSchema.pre("save", function (next) {
  // Check if the renewal date is missing but we have startDate and frequency to calculate it
  if (!this.renewalDate && this.startDate && this.frequency) {
    // Define the number of days for each subscription frequency
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30, // Approximate month length
      yearly: 365, // Non-leap year
    };

    // Create a new date object starting from the subscription's start date
    this.renewalDate = new Date(this.startDate);

    // Add the appropriate number of days based on the frequency to get the renewal date
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // If the renewal date exists and is in the past, mark the subscription as expired
  if (this.renewalDate && this.renewalDate.getTime() < Date.now()) {
    this.status = "expired";
  }

  // Proceed to the next middleware or save the document
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
