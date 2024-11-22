import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { StyledText, StyledView } from '../../../Style/Style';
const Setting = ({ navigation }) => {
  const [events, setEvents] = useState([
    {
      name: 'Community Meetup',
      location: 'Central Park',
      dateAndTime: '2024-12-01 10:00 AM',
      description: 'A meetup for local community members to network and share ideas.',
      tags: ["Favorites"]
    },
    {
      name: 'Tech Conference',
      location: 'Downtown Convention Center',
      dateAndTime: '2024-12-10 09:00 AM',
      description: 'A conference showcasing the latest in technology and innovation.',
      tags: ["Favorites"]
    },
    {
      name: 'Pizza Party',
      location: 'Downtown Convention Center',
      dateAndTime: '2024-12-10 09:00 AM',
      description: 'A conference showcasing the latest in technology and innovation.',
      tags: ["Off Campus"]
    },
    {
      name: 'Study Party',
      location: 'Downtown Convention Center',
      dateAndTime: '2024-12-10 09:00 AM',
      description: 'A conference showcasing the latest in technology and innovation.',
      tags: ["On Campus"]
    },
  ]);
  const [tags, setTags] = useState(['All', 'Favorites', 'On Campus', 'Off Campus']);
  const [selectedTag, setSelectedTag] = useState('All');
  const filteredEvents = selectedTag === 'All'
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
    <StyledView className="flex-1 bg-gray-100">
      <StyledView className="px-4 py-6 shadow-md">
        <StyledText className="text-4xl font-bold text-blue-800">Events</StyledText>
      </StyledView>
      <StyledView className="px-4 mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-3">
          {tags.map((tag, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full ${selectedTag === tag
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
                }`}
            >
              <Text className="font-semibold">{tag}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </StyledView>

      {/* Event List Section */}
      <StyledView className="px-4 py-4 space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((eventItem, index) => (
            <StyledView
              key={index}
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <Text className="text-lg font-semibold text-gray-900">
                <Text className="font-bold">{eventItem.name}</Text>
              </Text>
              <Text className="text-gray-700">
                <Text className='font-bold'>Location:</Text> <Text className="font-normal">{eventItem.location}</Text>
              </Text>
              <Text className="text-gray-700">
                <Text className='font-bold'>Date & Location:</Text> <Text className="font-normal">{eventItem.dateAndTime}</Text>
              </Text>
              <StyledView className="flex flex-row space-x-4 mt-4">
                <Pressable
                  onPress={() => { handleToggleFavorite(index) }}
                  className={`${eventItem.tags.includes("Favorites") ? "px-4 py-2 bg-green-500 rounded-md" : "px-4 py-2 bg-trasparent border border-green-500 rounded-md"}`}
                >
                  <Text className={`${eventItem.tags.includes("Favorites") ? "text-white font-semibold" : "text-green-500 font-semibold"}`}>{eventItem.tags.includes("Favorites") ? "Saved" : "Save"}</Text>
                </Pressable>
              </StyledView>
            </StyledView>
          ))
        ) : (
          <StyledText className="text-center text-gray-600">No Events Available</StyledText>
        )}
      </StyledView>
    </StyledView>
  );
};

export default Setting;