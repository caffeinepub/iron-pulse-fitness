import List "mo:core/List";
import Map "mo:core/Map";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module ContactSubmission {
    public func compare(cs1 : ContactSubmission, cs2 : ContactSubmission) : Order.Order {
      switch (Int.compare(cs1.timestamp, cs2.timestamp)) {
        case (#equal) { Text.compare(cs1.email, cs2.email) };
        case (order) { order };
      };
    };
  };

  let submissionsList = List.empty<ContactSubmission>();
  let newsletterSignups = Map.empty<Text, Time.Time>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async Text {
    let submission : ContactSubmission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    submissionsList.add(submission);
    "Contact form submitted successfully";
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    submissionsList.toArray().sort();
  };

  public shared ({ caller }) func signupNewsletter(email : Text) : async Text {
    if (email.trim(#char ' ') == "") {
      Runtime.trap("Invalid email: cannot be empty");
    };

    if (newsletterSignups.containsKey(email)) {
      Runtime.trap(
        "Email already signed up for newsletter"
      );
    };

    newsletterSignups.add(email, Time.now());
    "Newsletter signup successful";
  };

  public query ({ caller }) func getTotalSignups() : async Nat {
    newsletterSignups.size();
  };

  public query ({ caller }) func getNewsletterSignupTimestamp(email : Text) : async ?Time.Time {
    newsletterSignups.get(email);
  };

  public query ({ caller }) func getAllNewsletterSignups() : async [(Text, Time.Time)] {
    newsletterSignups.entries().toArray();
  };
};
