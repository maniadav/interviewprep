# React Native Interview Guide: 24-Hour Preparation Plan

This study guide is designed as your complete resource for React Native interview preparation in just 24 hours. It's organized to maximize your limited time with the most critical concepts first, practical code examples, and targeted study blocks to ensure you're fully prepared.

## How to Use This Guide

**Time allocation recommendation:**
- **Core Concepts**: 8 hours
- **Common Questions & Answers**: 6 hours
- **Coding Challenges**: 4 hours
- **Real-World Scenarios**: 3 hours
- **Latest Trends & Advanced Topics**: 3 hours

Let's begin your focused preparation!

---

## PART 1: Core React Native Concepts (8 hours)

### React Native Architecture (2 hours)

#### Traditional Architecture

React Native works through a multi-threaded architecture:

1. **JavaScript Thread**: Executes your React code, handles business logic
2. **Native UI Thread**: Renders native components, processes user interactions
3. **Shadow Thread**: Calculates layouts using Yoga (Facebook's layout engine)
4. **Bridge**: Enables communication between JS and native code

```
JavaScript Code → Bridge (JSON serialization) → Native Modules
```

**Key Interview Point:** The bridge is asynchronous and serializes all data, which can cause performance bottlenecks for UI operations requiring high frequency updates.

#### New Architecture (Fabric & TurboModules)

The new architecture addresses performance limitations with:

1. **Fabric**: New rendering system with synchronous operations 
2. **TurboModules**: Lazy-loaded native modules for faster startup
3. **JSI (JavaScript Interface)**: Direct JS-to-C++ communication without serialization
4. **CodeGen**: Automates interface code generation

```
JavaScript → JSI (direct reference) → C++ → Native Components
```

**Code Example - Accessing a Native Module:**

```javascript
// Old Architecture
import { NativeModules } from 'react-native';
const { LocationModule } = NativeModules;
// Asynchronous, JSON serialized
LocationModule.getCurrentPosition((position) => {
  console.log(position);
});

// New Architecture with TurboModules 
import { getTurboModule } from 'react-native';
const LocationModule = getTurboModule('LocationModule');
// Can be synchronous, no serialization
const position = LocationModule.getCurrentPositionSync();
console.log(position);
```

### Components & Props (1.5 hours)

#### Component Types

1. **Functional Components (Preferred)**

```javascript
import React from 'react';
import { Text, View } from 'react-native';

const Greeting = ({ name }) => {
  return (
    <View style={{ padding: 10 }}>
      <Text>Hello, {name}!</Text>
    </View>
  );
};

export default Greeting;
```

2. **Class Components (Legacy but important to understand)**

```javascript
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Greeting extends Component {
  render() {
    return (
      <View style={{ padding: 10 }}>
        <Text>Hello, {this.props.name}!</Text>
      </View>
    );
  }
}

export default Greeting;
```

#### Core Native Components

- **View**: Container component (like div)
- **Text**: Text display component 
- **Image**: Image display with built-in caching
- **TextInput**: User input field
- **ScrollView**: Scrollable container
- **FlatList/SectionList**: Optimized list components 
- **TouchableOpacity/TouchableHighlight**: Touch interaction components

**Interview Tip:** Be ready to explain why specialized components like `FlatList` are preferred over `ScrollView` for large datasets (virtualization).

### State Management (1.5 hours)

#### Local Component State

```javascript
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
    </View>
  );
};
```

#### Global State Management

1. **Context API** (Built-in, good for medium-complexity apps)

```javascript
// Create context
const ThemeContext = React.createContext('light');

// Provider component
const App = () => {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

// Consumer component
const Header = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff' }}>
      <Text style={{ color: theme === 'dark' ? '#fff' : '#333' }}>
        My App
      </Text>
    </View>
  );
};
```

2. **Redux** (Predictable state container, best for complex apps)

```javascript
// Action
const increment = () => ({ type: 'INCREMENT' });

// Reducer
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
};

// Store + Component Integration
import { Provider, useSelector, useDispatch } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(counterReducer);

const CounterApp = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

const Counter = () => {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
    </View>
  );
};
```

**Interview Tip:** Explain that your choice of state management depends on app complexity, team size, and debugging needs. Be ready to compare Redux, MobX, Recoil, and Context API.

### Hooks (1 hour)

Essential hooks to know:

#### useState

```javascript
const [value, setValue] = useState(initialValue);
```

#### useEffect

```javascript
// Component lifecycle
useEffect(() => {
  console.log('Component mounted');
  
  return () => {
    console.log('Component will unmount');
  };
}, []); // Empty dependency array = componentDidMount + componentWillUnmount

// Run when dependencies change (componentDidUpdate)
useEffect(() => {
  console.log('count changed:', count);
}, [count]);
```

#### useCallback & useMemo

```javascript
// Memoize function reference to prevent unnecessary rerenders
const handlePress = useCallback(() => {
  console.log('Button pressed, count is:', count);
}, [count]);

// Memoize expensive calculation
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

#### useRef

```javascript
// Persist values between renders without causing rerenders
const intervalRef = useRef(null);

useEffect(() => {
  intervalRef.current = setInterval(() => {
    // Do something periodically
  }, 1000);
  
  return () => clearInterval(intervalRef.current);
}, []);

// Access a DOM/native element
const inputRef = useRef(null);
<TextInput ref={inputRef} />
// Later: inputRef.current.focus();
```

#### Custom Hook Example

```javascript
// Custom hook for form input
const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  
  const handleChange = (text) => {
    setValue(text);
  };
  
  return {
    value,
    onChangeText: handleChange
  };
};

// Usage
const EmailForm = () => {
  const email = useFormInput('');
  
  return <TextInput placeholder="Email" {...email} />;
};
```

### Navigation (1 hour)

React Navigation is the de-facto standard for navigation in React Native.

#### Stack Navigator

```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Dashboard' }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

#### Navigation Between Screens

```javascript
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { itemId: 86 })}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  // Get parameters from navigation
  const { itemId } = route.params;
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details for Item {itemId}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
```

#### Tab Navigator

```javascript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

### Styling & Layout (1 hour)

#### StyleSheet API

```javascript
import { StyleSheet, View, Text } from 'react-native';

const Card = ({ title, content }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.content}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android shadow
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: '#666',
  },
});
```

**Key Interview Points:**
- StyleSheet.create provides optimization over inline styles
- React Native styles are similar to CSS but camelCase (e.g., backgroundColor)
- No cascading or inheritance in RN styles

#### Flexbox Layout

**Key differences from web:**
- `flexDirection` defaults to `column` (not `row`)
- `flex` with single number behaves differently from CSS  

```javascript
import { View, Text, StyleSheet } from 'react-native';

const FlexboxExample = () => (
  <View style={styles.container}>
    <View style={styles.box1}><Text>1</Text></View>
    <View style={styles.box2}><Text>2</Text></View>
    <View style={styles.box3}><Text>3</Text></View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // horizontal layout
    justifyContent: 'space-between', // spacing along main axis
    alignItems: 'center', // alignment along cross axis
    padding: 10,
  },
  box1: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    width: 50,
    height: 100,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box3: {
    width: 50,
    height: 150,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```
---

## PART 2: Common Interview Questions & Answers (6 hours)

Study these questions and their detailed answers. For each question, understand the core concepts, prepare to speak about them clearly, and have code examples ready.

### Architecture & Fundamentals

#### How does React Native differ from React?

**Concise Answer:** 
"React is a JavaScript library for building web UIs using the virtual DOM. React Native extends React's paradigm to mobile development, using native components instead of web elements. While React outputs HTML to the browser DOM, React Native produces native UI components through a bridge that communicates between JS and native platforms."

**Key Differences:**
- React → Web DOM vs. React Native → Native Components
- HTML tags vs. Native components (`<div>` vs. `<View>`)
- CSS styling vs. JavaScript object styles
- React Native requires a bridge to communicate with native platform
- Platform-specific considerations are more important in React Native

#### Explain the performance considerations in React Native

**Concise Answer:**
"Performance optimization in React Native focuses on three main areas: minimizing bridge traffic, efficient list rendering, and optimizing JavaScript execution. Since the bridge serializes data between JS and native code, reducing unnecessary communication is crucial. For lists, using `FlatList` with proper configuration prevents rendering off-screen items. And since all JS runs on a single thread, heavy computations should be optimized or moved to native modules."

**Key Points:**
- Use `useCallback` and `useMemo` to prevent unnecessary re-renders
- Configure `FlatList` with `windowSize`, `removeClippedSubviews`, and `getItemLayout`
- Implement memoization for expensive calculations
- Move animations to the native thread with `useNativeDriver: true`
- Consider using Hermes JS engine for better performance
- Profile with Flipper/React DevTools to identify bottlenecks

**Code Example:**
```javascript
// Optimized FlatList configuration
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  windowSize={5}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  initialNumToRender={10}
  updateCellsBatchingPeriod={50}
/>
```

#### What are the limitations of React Native?

**Concise Answer:**
"While powerful, React Native has limitations. Its bridge architecture introduces performance overhead for operations requiring frequent native communication. Not all native APIs are exposed out-of-the-box, often requiring custom native modules. Platform-specific bugs may require native code knowledge to fix. Complex animations and heavy computational tasks may not perform as well as in fully native apps without optimization."

**Key Points:**
- Performance overhead from bridge serialization (improving with new architecture)
- Native module development requires platform-specific knowledge
- Some complex UI interactions are difficult to achieve
- Platform inconsistencies require specific handling
- Additional app size overhead compared to pure native
- Debugging can be more complex than web or native development

### Component Patterns & State Management

#### How would you manage state in a complex React Native app?

**Concise Answer:**
"I recommend a layered approach to state management based on scope and persistence needs. For component-local state, React's `useState` or `useReducer` hooks are sufficient. For state shared across related components, Context API works well. For app-wide state with complex interactions, Redux provides predictable data flow and great debugging tools. For persistent state, combine with solutions like AsyncStorage or Redux Persist."

**Key Points:**
- Local component state: `useState`/`useReducer`
- Shared state between related components: Context API
- Complex global state: Redux/MobX/Recoil
- Persistent state: AsyncStorage + Redux Persist

**Code Example for Layered State Management:**
```javascript
// 1. Component local state
const ProductCard = ({ product }) => {
  const [expanded, setExpanded] = useState(false);
  // ...
};

// 2. Context API for theme (shared across many components)
const ThemeContext = React.createContext('light');

// 3. Redux for global shopping cart state
// actions.js
export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product
});

// reducer.js
const cartReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    // other cases
    default:
      return state;
  }
};

// Store + Component Integration
import { Provider, useSelector, useDispatch } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(counterReducer);

const CounterApp = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

const Counter = () => {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
    </View>
  );
};
```

#### Explain the difference between controlled and uncontrolled components

**Concise Answer:**
"Controlled components have their state managed by React through props, while uncontrolled components manage their own internal state. With controlled components like a TextInput with value and onChangeText props, the React component is the single source of truth. This enables input validation, formatting, and conditional logic. Uncontrolled components use refs to access their values directly and are simpler but offer less control."

**Code Examples:**

```javascript
// Controlled component
const ControlledInput = () => {
  const [text, setText] = useState('');
  
  return (
    <View>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type here..."
      />
      <Text>You typed: {text}</Text>
    </View>
  );
};

// Uncontrolled component
const UncontrolledInput = () => {
  const inputRef = useRef(null);
  
  const handleButtonPress = () => {
    // Access value when needed
    Alert.alert('Input value', inputRef.current.value);
  };
  
  return (
    <View>
      <TextInput
        ref={inputRef}
        defaultValue=""
        placeholder="Type here..."
      />
      <Button title="Submit" onPress={handleButtonPress} />
    </View>
  );
};
```

### React Native APIs & Practices

#### How would you handle platform-specific code?

**Concise Answer:**
"I approach platform-specific code in three main ways. First, using the Platform module for simple conditional logic. Second, with platform-specific file extensions (.ios.js/.android.js) for components with larger differences. Third, by creating abstracted interfaces for complex native functionality that have platform-specific implementations underneath."

**Code Examples:**

```javascript
// 1. Platform module
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.14,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

// 2. Platform-specific files
// Button.ios.js
export default function Button(props) {
  return <IOSButton {...props} />;
}

// Button.android.js
export default function Button(props) {
  return <AndroidButton {...props} />;
}

// In your component:
import Button from './Button'; // Automatically imports correct version

// 3. Abstract interface with platform implementations
// locationService.js
import { Platform } from 'react-native';
import IOSLocationService from './locationService.ios';
import AndroidLocationService from './locationService.android';

export default Platform.select({
  ios: IOSLocationService,
  android: AndroidLocationService,
});
```

#### How do you handle deep linking in React Native?

**Concise Answer:**
"Deep linking allows users to navigate directly to specific content in your app by clicking a URL. In React Native, I implement deep linking by configuring URL schemes in native code (Info.plist for iOS, AndroidManifest.xml for Android), then using React Navigation's linking configuration to map URLs to specific screens. This creates a seamless experience where external links can open specific parts of the app directly."

**Implementation Example:**

```javascript
// In your navigation container
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  const linking = {
    prefixes: ['myapp://', 'https://myapp.com'],
    config: {
      screens: {
        Home: 'home',
        Profile: {
          path: 'user/:id',
          parse: {
            id: (id) => `user-${id}`,
          },
        },
        Settings: 'settings',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>{/* ... */}</Stack.Navigator>
    </NavigationContainer>
  );
};
```

### Performance Optimization

#### How would you debug and solve performance issues in React Native?

**Concise Answer:**
"My approach to performance issues follows a systematic process. First, I identify the symptoms using tools like Flipper, React DevTools Profiler, or Systrace. Then I analyze for common issues like excessive re-renders, bridge traffic, or unoptimized lists. The fix depends on the issue - maybe using memo/useCallback, optimizing FlatList configuration, moving animations to the native thread, or reducing bridge traffic. I validate improvements with the same measurement tools."

**Common Issues & Solutions:**

1. **Excessive re-renders**
   - Use React.memo, useMemo, useCallback
   - Avoid inline function props
   - Use PureComponent for class components

2. **Slow list performance**
   - Replace ScrollView with FlatList/SectionList
   - Configure windowSize, getItemLayout, removeClippedSubviews
   - Implement proper key extraction

3. **Janky animations**
   - Use useNativeDriver: true
   - Consider React Native Reanimated for complex animations
   - Avoid layout changes during animations

4. **Startup time issues**
   - Implement code splitting and lazy loading
   - Use Hermes JavaScript engine
   - Consider app size optimization

#### Explain how to implement smooth animations in React Native

**Concise Answer:**
"For smooth animations in React Native, I use the Animated API with `useNativeDriver: true` to run animations on the UI thread instead of the JS thread. This eliminates bridge communication during animation frames. For complex animations, I use React Native Reanimated which provides a declarative API and worklet functions that run directly on the UI thread. I also ensure animations don't trigger layout recalculations and use optimized components like Animated.FlatList for list animations."

**Code Example:**

```javascript
import React, { useRef } from 'react';
import { Animated, TouchableOpacity, Text, View } from 'react-native';

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true, // Run on UI thread
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

// Reanimated 2 example
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedButton = () => {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const onPressIn = () => {
    scale.value = withSpring(1.2);
  };
  
  const onPressOut = () => {
    scale.value = withSpring(1);
  };
  
  return (
    <TouchableOpacity
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[styles.button, animatedStyle]}>
        <Text style={styles.buttonText}>Press Me</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};
```

### Native Module Integration

#### How would you create a custom native module?

**Concise Answer:**
"Creating a custom native module involves implementing native code in Java/Kotlin for Android and Objective-C/Swift for iOS, then exposing it to JavaScript through the bridge. For Android, you create a class extending ReactContextBaseJavaModule, implement required methods, and register it in a package. For iOS, you create an RCT-prefixed Objective-C class conforming to RCTBridgeModule protocol. Then you access it from JS using NativeModules."

**Example (simplified):**

```javascript
// JavaScript
import { NativeModules } from 'react-native';
const { CalendarModule } = NativeModules;

// Call the native method
CalendarModule.createCalendarEvent(
  'Doctor\'s Appointment',
  'New York',
  (eventId) => {
    console.log(`Created event with id ${eventId}`);
  }
);
```

```java
// Android (Java)
public class CalendarModule extends ReactContextBaseJavaModule {
  // Module name exposed to JS
  @Override
  public String getName() {
    return "CalendarModule";
  }
  
  // Exposed method
  @ReactMethod
  public void createCalendarEvent(String name, String location, Callback callback) {
    // Native implementation
    Integer eventId = /* create the event */;
    // Invoke the callback with event id
    callback.invoke(eventId);
  }
}

// Register the module
public class MyPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
    modules.add(new CalendarModule(reactContext));
    return modules;
  }
  // ...
}
```

```objective-c
// iOS (Objective-C)
@interface RCTCalendarModule : NSObject <RCTBridgeModule>
@end

@implementation RCTCalendarModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name
                  location:(NSString *)location
                  callback:(RCTResponseSenderBlock)callback)
{
  NSInteger eventId = /* create the event */;
  callback(@[@(eventId)]);
}

@end
```
---

## PART 3: Coding Challenges (4 hours)

Practice these common coding challenges that interviewers often ask. Try to implement them yourself before looking at the solutions.

### Challenge 1: Create a Custom Hook for API Fetching with Loading and Error States

**Problem:** Create a reusable hook for fetching data from an API that handles loading states, errors, and successful responses.

**Solution:**

```javascript
import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, { signal: abortController.signal });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Cleanup function to cancel the fetch if component unmounts
    return () => abortController.abort();
  }, [url]);

  return { data, loading, error };
};

// Usage example:
const MyComponent = () => {
  const { data, loading, error } = useFetch('https://api.example.com/data');
  
  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error}</Text>;
  
  return (
    <View>
      {data && <Text>{JSON.stringify(data)}</Text>}
    </View>
  );
};
```

**Key Points:**
- Use AbortController to cancel fetch requests when component unmounts
- Handle all possible states: loading, error, and success
- Properly type the hook for TypeScript applications
- Centralize error handling logic

### Challenge 2: Implement a Debounced Search Component

**Problem:** Create a search input that only triggers API requests after the user stops typing for 500ms.

**Solution:**

```javascript
import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';

const DebouncedSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Update debounced value after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    // Clear timeout if searchTerm changes before delay expires
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch results when debouncedTerm changes
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedTerm) {
        setResults([]);
        return;
      }
      
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.example.com/search?q=${debouncedTerm}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedTerm]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search..."
      />
      
      {loading && <Text>Loading...</Text>}
      
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default DebouncedSearch;
```

**Key Points:**
- Two separate state variables track immediate input vs. debounced value
- Cleanup function prevents stale timeouts
- Only fetches data when user has stopped typing

### Challenge 3: Implement Infinite Scrolling in a FlatList

**Problem:** Create a list component that loads more data when the user scrolls to the bottom.

**Solution:**

```javascript
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Text, View, ActivityIndicator, StyleSheet } from 'react-native';

const InfiniteScrollList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchData = useCallback(async (pageNumber = 1, shouldRefresh = false) => {
    if (loading || (!hasMoreData && pageNumber !== 1)) return;
    
    setLoading(true);
    try {
      // Example API that returns paginated data
      const response = await fetch(
        `https://api.example.com/items?page=${pageNumber}&limit=20`
      );
      const newItems = await response.json();
      
      // If no more items or empty response, mark as end of data
      if (newItems.length === 0) {
        setHasMoreData(false);
        return;
      }
      
      // Update state based on whether this is a refresh or pagination
      if (shouldRefresh || pageNumber === 1) {
        setData(newItems);
      } else {
        setData(prevData => [...prevData, ...newItems]);
      }
      
      setPage(pageNumber);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [loading, hasMoreData]);

  // Initial load
  useEffect(() => {
    fetchData(1);
  }, []);

  // Handle refresh - reset and load first page
  const handleRefresh = () => {
    setRefreshing(true);
    setHasMoreData(true);
    fetchData(1, true);
  };

  // Load next page when end reached
  const handleEndReached = () => {
    if (!loading && hasMoreData) {
      fetchData(page + 1);
    }
  };

  // Footer for loading indicator
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      )}
      ListFooterComponent={renderFooter}
      onRefresh={handleRefresh}
      refreshing={refreshing}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
});

export default InfiniteScrollList;
```

**Key Points:**
- Track pagination state and loading states
- Handle both infinite scrolling and pull-to-refresh
- Detect when there's no more data to prevent unnecessary API calls
- Use useCallback to prevent recreation of the fetch function

## PART 4: Real-World Scenarios (3 hours)

Practice your problem-solving skills with these common challenges you might face in a React Native project.

### Scenario 1: Performance Optimization

**Situation:** Your React Native app is experiencing lag when scrolling through a list of products with images.

**Solution Approach:**

1. **Diagnose the issue:**
   - Use React DevTools Profiler to identify frequent re-renders
   - Check for unnecessary state changes when scrolling
   - Monitor memory usage with native profiler tools

2. **Optimize image loading:**
   ```javascript
   // Use FastImage for better caching and performance
   import FastImage from 'react-native-fast-image';
   
   // Resize images on the server or use proper sizing
   <FastImage
     style={{ width: 100, height: 100 }}
     source={{
       uri: 'https://example.com/product.jpg',
       priority: FastImage.priority.high,
       cache: FastImage.cacheControl.immutable,
     }}
     resizeMode={FastImage.resizeMode.contain}
   />
   ```

3. **Optimize list rendering:**
   ```javascript
   // Memoize your renderItem function
   const renderItem = useCallback(({ item }) => (
     <ProductCard product={item} />
   ), []);
   
   // Memoize the ProductCard component
   const ProductCard = React.memo(({ product }) => {
     // Component implementation
   });
   
   // Optimize FlatList
   <FlatList
     data={products}
     renderItem={renderItem}
     keyExtractor={item => item.id}
     getItemLayout={(data, index) => ({
       length: ITEM_HEIGHT,
       offset: ITEM_HEIGHT * index,
       index,
     })}
     windowSize={5}
     removeClippedSubviews={true}
     maxToRenderPerBatch={10}
     initialNumToRender={8}
     updateCellsBatchingPeriod={50}
   />
   ```

4. **Avoid unnecessary renders:**
   - Use useCallback for event handlers
   - Implement PureComponent or React.memo
   - Move expensive computations outside render

### Scenario 2: Handling Offline Support

**Situation:** Your app needs to function offline and sync data when connectivity returns.

**Solution Approach:**

1. **Detect connectivity status:**
   ```javascript
   import NetInfo from '@react-native-community/netinfo';
   import { useEffect, useState } from 'react';
   
   const useNetInfo = () => {
     const [isConnected, setIsConnected] = useState(true);
     
     useEffect(() => {
       const unsubscribe = NetInfo.addEventListener(state => {
         setIsConnected(state.isConnected);
       });
       
       return () => unsubscribe();
     }, []);
     
     return isConnected;
   };
   ```

2. **Implement offline data storage:**
   ```javascript
   import AsyncStorage from '@react-native-async-storage/async-storage';
   // Or use a more robust solution like Realm, WatermelonDB, or SQLite
   
   // Store data locally
   const storeData = async (key, value) => {
     try {
       await AsyncStorage.setItem(key, JSON.stringify(value));
     } catch (e) {
       console.error('Storage error:', e);
     }
   };
   
   // Retrieve local data
   const getData = async (key) => {
     try {
       const value = await AsyncStorage.getItem(key);
       return value ? JSON.parse(value) : null;
     } catch (e) {
       console.error('Retrieval error:', e);
       return null;
     }
   };
   ```

3. **Queue API requests when offline:**
   ```javascript
   import Queue from 'queue-promise';
   
   // Create a queue for API requests
   const apiQueue = new Queue({
     concurrent: 1,
     interval: 1000,
   });
   
   // Add requests to queue
   const addToQueue = (apiCall) => {
     apiQueue.enqueue(() => {
       return NetInfo.fetch().then(state => {
         if (state.isConnected) {
           return apiCall();
         } else {
           // Re-add to queue if still offline
           addToQueue(apiCall);
           return Promise.reject('Offline');
         }
       });
     });
   };
   ```

4. **Sync when back online:**
   ```javascript
   useEffect(() => {
     const handleConnectivityChange = (state) => {
       if (state.isConnected) {
         syncData();
       }
     };
     
     const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
     
     return () => unsubscribe();
   }, []);
   
   const syncData = async () => {
     const pendingActions = await getData('pendingActions');
     if (pendingActions && pendingActions.length > 0) {
       // Process pending actions
       for (const action of pendingActions) {
         try {
           await apiCall(action);
           // Remove from pending after success
         } catch (e) {
           // Handle error
         }
       }
     }
   };
   ```

### Scenario 3: Handling Authentication Flow

**Situation:** You need to implement a secure authentication flow with token refresh.

**Solution Approach:**

1. **Create an auth context:**
   ```javascript
   import React, { createContext, useState, useEffect, useContext } from 'react';
   import AsyncStorage from '@react-native-async-storage/async-storage';
   
   const AuthContext = createContext(null);
   
   export const AuthProvider = ({ children }) => {
     const [authState, setAuthState] = useState({
       token: null,
       refreshToken: null,
       authenticated: false,
       loading: true,
     });
     
     // Load tokens from storage on initial render
     useEffect(() => {
       loadTokens();
     }, []);
     
     const loadTokens = async () => {
       try {
         const [token, refreshToken] = await Promise.all([
           AsyncStorage.getItem('token'),
           AsyncStorage.getItem('refreshToken'),
         ]);
         
         if (token && refreshToken) {
           setAuthState({
             token,
             refreshToken,
             authenticated: true,
             loading: false,
           });
         } else {
           setAuthState({
             token: null,
             refreshToken: null,
             authenticated: false,
             loading: false,
           });
         }
       } catch (e) {
         console.error('Failed to load auth tokens', e);
         setAuthState({
           token: null,
           refreshToken: null,
           authenticated: false,
           loading: false,
         });
       }
     };
     
     const login = async (credentials) => {
       try {
         // Call login API
         const response = await fetch('https://api.example.com/login', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(credentials),
         });
         
         const data = await response.json();
         
         if (response.ok) {
           const { token, refreshToken } = data;
           
           // Store tokens
           await Promise.all([
             AsyncStorage.setItem('token', token),
             AsyncStorage.setItem('refreshToken', refreshToken),
           ]);
           
           setAuthState({
             token,
             refreshToken,
             authenticated: true,
             loading: false,
           });
           
           return true;
         } else {
           throw new Error(data.message || 'Login failed');
         }
       } catch (e) {
         console.error('Login error', e);
         return false;
       }
     };
     
     const logout = async () => {
       // Clear tokens
       await Promise.all([
         AsyncStorage.removeItem('token'),
         AsyncStorage.removeItem('refreshToken'),
       ]);
       
       setAuthState({
         token: null,
         refreshToken: null,
         authenticated: false,
         loading: false,
       });
     };
     
     const refreshAuthToken = async () => {
       if (!authState.refreshToken) return false;
       
       try {
         // Call refresh token API
         const response = await fetch('https://api.example.com/refresh', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ refreshToken: authState.refreshToken }),
         });
         
         const data = await response.json();
         
         if (response.ok) {
           const { token, refreshToken } = data;
           
           // Update tokens
           await Promise.all([
             AsyncStorage.setItem('token', token),
             AsyncStorage.setItem('refreshToken', refreshToken),
           ]);
           
           setAuthState({
             token,
             refreshToken,
             authenticated: true,
             loading: false,
           });
           
           return true;
         } else {
           // If refresh fails, log out
           await logout();
           return false;
         }
       } catch (e) {
         console.error('Token refresh error', e);
         await logout();
         return false;
       }
     };
     
     return (
       <AuthContext.Provider 
         value={{ 
           ...authState, 
           login, 
           logout, 
           refreshAuthToken 
         }}
       >
         {children}
       </AuthContext.Provider>
     );
   };
   
   export const useAuth = () => useContext(AuthContext);
   ```

2. **Create an authenticated API client:**
   ```javascript
   import axios from 'axios';
   import { useAuth } from './AuthContext';
   
   export const useApiClient = () => {
     const { token, refreshAuthToken } = useAuth();
     
     const apiClient = axios.create({
       baseURL: 'https://api.example.com',
       headers: {
         'Content-Type': 'application/json',
       },
     });
     
     // Add token to requests
     apiClient.interceptors.request.use(
       config => {
         if (token) {
           config.headers.Authorization = `Bearer ${token}`;
         }
         return config;
       },
       error => Promise.reject(error)
     );
     
     // Handle token refresh on 401 errors
     apiClient.interceptors.response.use(
       response => response,
       async error => {
         const originalRequest = error.config;
         
         if (error.response?.status === 401 && !originalRequest._retry) {
           originalRequest._retry = true;
           
           const refreshSuccess = await refreshAuthToken();
           
           if (refreshSuccess) {
             originalRequest.headers.Authorization = `Bearer ${token}`;
             return apiClient(originalRequest);
           }
         }
         
         return Promise.reject(error);
       }
     );
     
     return apiClient;
   };
   ```

3. **Implement protected routes:**
   ```javascript
   import { NavigationContainer } from '@react-navigation/native';
   import { createStackNavigator } from '@react-navigation/stack';
   import { useAuth } from './AuthContext';
   
   const Stack = createStackNavigator();
   
   export default function App() {
     const { authenticated, loading } = useAuth();
     
     if (loading) {
       return <SplashScreen />;
     }
     
     return (
       <NavigationContainer>
         <Stack.Navigator>
           {authenticated ? (
             // Protected routes
             <>
               <Stack.Screen name="Home" component={HomeScreen} />
               <Stack.Screen name="Profile" component={ProfileScreen} />
             </>
           ) : (
             // Public routes
             <>
               <Stack.Screen name="Login" component={LoginScreen} />
               <Stack.Screen name="Register" component={RegisterScreen} />
             </>
           )}
         </Stack.Navigator>
       </NavigationContainer>
     );
   }
   ```

## PART 5: Latest Trends & Advanced Topics (3 hours)

Stay updated with these cutting-edge topics to demonstrate your expertise in React Native development.

### New React Native Architecture

The New Architecture brings several key improvements:

1. **Fabric (New Rendering System)**
   - Synchronous communication between JavaScript and native
   - Improved UI consistency and animation
   - Reduced dropped frames
   - Support for React Concurrent Mode

2. **TurboModules**
   - Lazy-loading of native modules
   - Type-safe interfaces through code generation
   - Reduced app startup time
   - Direct JSI-based communication

3. **JSI (JavaScript Interface)**
   - Direct JavaScript to C++ communication
   - Eliminates JSON serialization overhead
   - Enables synchronous method calls
   - Enables JavaScript to hold references to C++ objects

4. **Codegen**
   - Automated generation of native interface code
   - Type safety across JavaScript and native boundaries
   - Reduced boilerplate code
   - Fewer runtime errors

**Migration Steps to New Architecture:**

1. Update to React Native 0.68+ (0.70+ preferred)
2. Enable Hermes JavaScript engine
3. Migrate native modules to new specs
4. Configure Codegen for your project
5. Use feature flags to gradually adopt components

### React Native Web & Cross-Platform Development

React Native Web enables sharing code between mobile and web platforms:

```javascript
// Platform-agnostic component
import { View, Text, StyleSheet } from 'react-native';

const CrossPlatformComponent = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

// Works on Web, iOS, and Android
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

**Monorepo Approach with Nx or Turborepo:**

```
my-app/
├── apps/
│   ├── mobile/       # React Native
│   │   ├── ios/
│   │   └── android/
│   └── web/          # React
└── packages/
    ├── ui/           # Shared components
    ├── api/          # Shared API client
    └── utils/        # Shared utilities
```

### React Native Testing Strategies

**Unit Testing with Jest:**

```javascript
// Button.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

describe('Button', () => {
  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Press Me" onPress={onPress} />
    );
    
    fireEvent.press(getByText('Press Me'));
    
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

**Component Testing with React Native Testing Library:**

```javascript
// LoginForm.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginForm from './LoginForm';

jest.mock('../api/auth', () => ({
  login: jest.fn(() => Promise.resolve({ success: true })),
}));

describe('LoginForm', () => {
  it('submits form with email and password', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    
    fireEvent.changeText(
      getByPlaceholderText('Email'),
      'test@example.com'
    );
    
    fireEvent.changeText(
      getByPlaceholderText('Password'),
      'password123'
    );
    
    fireEvent.press(getByText('Login'));
    
    await waitFor(() => {
      expect(require('../api/auth').login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
```

**End-to-End Testing with Detox:**

```javascript
// loginFlow.e2e.js
describe('Login flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should login successfully', async () => {
    await element(by.id('email')).typeText('test@example.com');
    await element(by.id('password')).typeText('password123');
    await element(by.id('login-button')).tap();
    
    await expect(element(by.text('Welcome'))).toBeVisible();
  });
});
```

### React Native Accessibility

Making your app accessible to all users:

```javascript
// Accessible component example
import { View, Text, TouchableOpacity } from 'react-native';

const AccessibleButton = ({ onPress, label, hint }) => (
  <TouchableOpacity
    onPress={onPress}
    accessible={true}
    accessibilityLabel={label}
    accessibilityHint={hint}
    accessibilityRole="button"
  >
    <View style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </View>
  </TouchableOpacity>
);

// Usage
<AccessibleButton
  onPress={handleSubmit}
  label="Submit form"
  hint="Submits the form and proceeds to next screen"
/>
```

**Key Accessibility Properties:**

1. `accessible`: Marks the element as an accessibility element
2. `accessibilityLabel`: Text read by screen readers (VoiceOver/TalkBack)
3. `accessibilityHint`: Additional context about what the element does
4. `accessibilityRole`: Communicates the element's purpose
5. `accessibilityState`: Describes current state (disabled, selected, etc.)

---

## Final Interview Preparation Tips

1. **Review Your Projects:** Be ready to discuss challenges you faced and how you solved them.
2. **Practice Explaining Code:** Verbalize your thought process when solving problems.
3. **Prepare Questions:** Have thoughtful questions ready for your interviewers.
4. **Update Your Knowledge:** Check recent React Native releases for new features.
5. **Rest Well:** Ensure you're well-rested before the interview.

Good luck with your React Native interview! This guide covers the essential knowledge you need to succeed in just 24 hours of focused preparation.
