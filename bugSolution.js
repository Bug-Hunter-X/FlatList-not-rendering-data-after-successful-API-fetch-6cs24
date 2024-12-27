```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const DATA = [ ... ]; // Sample data

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('some-api-endpoint');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (data.length === 0) {
    return <Text>No data found.</Text>;
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text>{item.someProperty}</Text>}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<Text>No data to show</Text>}
    />
  );
};

const styles = StyleSheet.create({});

export default MyComponent;
```