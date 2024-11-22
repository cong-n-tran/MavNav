import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { StyledText, StyledView } from "../../../Style/Style";

const Setting = ({ navigation }) => {
  const [events, setEvents] = useState([
    {
      name: "Community Meetup",
      location: "Central Park",
      dateAndTime: "2024-12-01 10:00 AM",
      description: "A meetup for local community members to network and share ideas.",
      tags: ["Favorites"],
    },
    {
      name: "Tech Conference",
      location: "Downtown Convention Center",
      dateAndTime: "2024-12-10 09:00 AM",
      description: "A conference showcasing the latest in technology and innovation.",
      tags: ["Favorites"],
    },
    {
      name: "Pizza Party",
      location: "Student Union",
      dateAndTime: "2024-12-15 06:00 PM",
      description: "A fun evening with free pizza and games.",
      tags: ["Off Campus"],
    },
    {
      name: "Study Party",
      location: "Library",
      dateAndTime: "2024-12-18 09:00 PM",
      description: "Join us for a productive study session!",
      tags: ["On Campus"],
    },
  ]);

  const [tags, setTags] = useState(["All", "Favorites", "On Campus", "Off Campus"]);
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredEvents = selectedTag === "All"
    ? events
    : events.filter((event) => event.tags.includes(selectedTag));

  const handleToggleFavorite = (index) => {
    const newEvents = [...events];
    const updatedEvent = { ...newEvents[index] };

    if (updatedEvent.tags.includes("Favorites")) {
      updatedEvent.tags = updatedEvent.tags.filter((tag) => tag !== "Favorites");
    } else {
      updatedEvent.tags.push("Favorites");
    }

    newEvents[index] = updatedEvent;
    setEvents(newEvents);
  };

  return (
    <StyledView className="flex-1 bg-gray-50">
      {/* Header */}
      <StyledView className="bg-blue-800 p-6 rounded-b-3xl shadow-md mb-6">
        <StyledText className="text-white text-4xl font-bold">Events</StyledText>
        <StyledText className="text-white text-lg mt-2">
          Explore campus events tailored just for you
        </StyledText>
      </StyledView>

      {/* Tags Section */}
      <StyledView className="px-4 mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-3">
          {tags.map((tag, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full shadow-md ${selectedTag === tag
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
                }`}
            >
              <Text className="font-semibold">{tag}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </StyledView>

      {/* Events Section */}
      <StyledView className="px-4 space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((eventItem, index) => (
            <StyledView
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <StyledText className="text-xl font-bold text-blue-800 mb-2">
                {eventItem.name}
              </StyledText>
              <Text className="text-gray-700">
                <Text className="font-semibold">Location:</Text> {eventItem.location}
              </Text>
              <Text className="text-gray-700">
                <Text className="font-semibold">Date & Time:</Text> {eventItem.dateAndTime}
              </Text>
              <Text className="text-gray-700 mt-2">{eventItem.description}</Text>
              <StyledView className="flex-row space-x-4 mt-4">
                <Pressable
                  onPress={() => handleToggleFavorite(index)}
                  className={`px-4 py-2 rounded-md shadow-md ${eventItem.tags.includes("Favorites")
                      ? "bg-green-500"
                      : "bg-transparent border border-green-500"
                    }`}
                >
                  <Text
                    className={`font-semibold ${eventItem.tags.includes("Favorites")
                        ? "text-white"
                        : "text-green-500"
                      }`}
                  >
                    {eventItem.tags.includes("Favorites") ? "Saved" : "Save"}
                  </Text>
                </Pressable>
              </StyledView>
            </StyledView>
          ))
        ) : (
          <StyledText className="text-center text-gray-600">
            No Events Available
          </StyledText>
        )}
      </StyledView>
    </StyledView>
  );
};

export default Setting;
