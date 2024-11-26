import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { StyledText, StyledView } from "../../../Style/Style";

const Events = ({ navigation }) => {
  const [events, setEvents] = useState([
    {
      name: "Game Night",
      location: "Central Libary Basement",
      dateAndTime: "2024-12-01 8:00 PM",
      description: "Come have a fun night of gaming. May the best player win!.",
      tags: ["Favorites"],
    },
    {
      name: "Engineering Fair",
      location: "Nedderman Hall",
      dateAndTime: "2024-12-10 09:00 AM",
      description: "Come to the engineering fair to meet potential employers.",
      tags: ["Favorites"],
    },
    {
      name: "Roller Skate & Pizza Party",
      location: "RollerWorld",
      dateAndTime: "2024-12-15 06:00 PM",
      description: "An evening with free pizza and fun!",
      tags: ["Off Campus"],
    },
    {
      name: "Study Session",
      location: "West Library",
      dateAndTime: "2024-12-18 07:00 PM",
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
    <StyledView className="flex-1 bg-blue-100">
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
                  ? "bg-blue-800 text-white"
                  : "bg-gray-200 text-gray-800"
                }`}
            >
              <Text className="font-semibold">{tag}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </StyledView>

      {/* Events Section */}
      <ScrollView>
      <StyledView className="px-4 space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((eventItem, index) => (
            <StyledView
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg border-gray-400 border-4 border-opacity-50"
            >
              <StyledText className="text-xl font-bold text-blue-800 mb-2">
                {eventItem.name}
              </StyledText>
              <Text className="text-black">
                <Text className="font-semibold">Location:</Text> {eventItem.location}
              </Text>
              <Text className="text-black">
                <Text className="font-semibold">Date & Time:</Text> {eventItem.dateAndTime}
              </Text>
              <Text className="text-gray-700 mt-2">{eventItem.description}</Text>
              <StyledView className="flex-row space-x-4 mt-4">
                <Pressable
                  onPress={() => handleToggleFavorite(index)}
                  className={`px-4 py-2 rounded-md shadow-md ${eventItem.tags.includes("Favorites")
                      ? "bg-orange-500"
                      : "bg-white border-orange-500"
                    }`}
                >
                  <Text
                    className={`font-semibold ${eventItem.tags.includes("Favorites")
                        ? "text-white"
                        : "text-orange-500"
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
      </ScrollView>
    </StyledView>
  );
};

export default Events;