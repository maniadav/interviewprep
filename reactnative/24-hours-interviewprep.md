# React Native SDE-2 Interview Prep Guide (24-Hour Focus)

## Table of Contents

- [Top Critical React Native Concepts (40%)](#top-critical-react-native-concepts-40)
  - [1. Core Architecture](#1-core-architecture)
  - [2. Component Lifecycle](#2-component-lifecycle)
  - [3. State Management](#3-state-management)
  - [4. Navigation](#4-navigation)
  - [5. Performance Optimization](#5-performance-optimization)
  - [6. Native Module Integration](#6-native-module-integration)
  - [7. Styling & Layout](#7-styling--layout)
- [Most Common Interview Questions & Detailed Answers (30%)](#most-common-interview-questions--detailed-answers-30)
  - [Architecture & Fundamentals](#architecture--fundamentals)
  - [Component Patterns & State Management](#component-patterns--state-management)
  - [Navigation & Data Flow](#navigation--data-flow)
  - [Performance](#performance)
  - [Testing & Development Workflow](#testing--development-workflow)
- [Real-world Scenarios/Challenges with Solutions (15%)](#real-world-scenarioschallenges-with-solutions-15)
  - [1. App Startup Optimization](#1-app-startup-optimization)
  - [2. Offline-First Experience](#2-offline-first-experience)
  - [3. Native Integration Complexity](#3-native-integration-complexity)
  - [4. Cross-Platform UI Consistency](#4-cross-platform-ui-consistency)
  - [5. Animation Performance](#5-animation-performance)
- [Key Optimizations & Best Practices (10%)](#key-optimizations--best-practices-10)
  - [1. Memory Management](#1-memory-management)
  - [2. Bundle Size Optimization](#2-bundle-size-optimization)
  - [3. UI Responsiveness](#3-ui-responsiveness)
  - [4. Code Organization](#4-code-organization)
  - [5. Error Handling](#5-error-handling)
- [Advanced Talking Points (5%)](#advanced-talking-points-5)
  - [1. React Native Internals](#1-react-native-internals)
  - [2. Custom Renderer Implementation](#2-custom-renderer-implementation)

## Top Critical React Native Concepts (40%)

### 1. Core Architecture
- **Native Bridge**: Understand how JavaScript code communicates with native modules
- **Thread Model**: JavaScriptCore (JS thread), Main/UI Thread, Shadow Thread, Native Modules Thread
- **React Native Internals**:
  ```
  JS Thread → React → Shadow Tree → Yoga Layout → Native UI
  ```

### 2. Component Lifecycle
- **Function Components + Hooks**: 
  ```jsx
  // Modern approach using hooks
  useEffect(() => {
    // componentDidMount equivalent
    return () => {
      // componentWillUnmount equivalent
    };
  }, []);
  ```
- **Class Components**:
  ```jsx
  componentDidMount()
  componentDidUpdate(prevProps, prevState)
  componentWillUnmount()
  ```

### 3. State Management
- **Local State**: useState, useReducer
  ```jsx
  const [count, setCount] = useState(0);
  ```
- **Global State**: Context API vs Redux vs MobX
  ```jsx
  // Context API basic example
  const MyContext = React.createContext(defaultValue);
  
  // Provider
  <MyContext.Provider value={/* value */}>
    {children}
  </MyContext.Provider>
  
  // Consumer
  const value = useContext(MyContext);
  ```

### 4. Navigation
- **React Navigation**: Stack, Tab, Drawer navigation patterns
  ```jsx
  const Stack = createStackNavigator();
  
  function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  ```

### 5. Performance Optimization
- **Memoization**: React.memo, useMemo, useCallback
  ```jsx
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
  ```
- **FlatList/VirtualizedList**: How to efficiently render large lists
  ```jsx
  <FlatList
    data={items}
    renderItem={({ item }) => <Item title={item.title} />}
    keyExtractor={item => item.id}
    getItemLayout={(data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    })}
  />
  ```

### 6. Native Module Integration
- **Bridge Communication**: Exposing native functionality to JavaScript
- **Bridgeless Architecture**: The future with JSI and Fabric
- **Basic native module example**:
  ```jsx
  // Native module access
  import { NativeModules } from 'react-native';
  const { CalendarModule } = NativeModules;
  ```

### 7. Styling & Layout
- **Flexbox in React Native**: Differences from web CSS
- **StyleSheet API**: Performance benefits vs inline styles
  ```jsx
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  ```

## Most Common Interview Questions & Detailed Answers (30%)

### Architecture & Fundamentals

1. **How does React Native differ from React?**
   
   "React and React Native share the same core principles, but they target different platforms. React is designed for web applications and outputs HTML elements to the DOM, while React Native produces native UI components for mobile platforms.
   
   The key differences include:
   
   First, React Native uses a JavaScript bridge to communicate between the JS thread and native modules. This allows our JavaScript code to interact with device capabilities like the camera or GPS, which isn't necessary in web React.
   
   Second, styling works differently. In React Native, we use a subset of CSS properties with Flexbox for layout, but there's no cascade or inheritance like in web CSS. We also don't use pixels but work with density-independent units.
   
   Third, React Native has platform-specific components like `<View>` instead of `<div>` or `<Text>` instead of `<p>`. These components are ultimately rendered as native UI elements, giving our apps a truly native feel.
   
   In my experience, this means we need to think about cross-platform differences more carefully when developing with React Native."

2. **Explain the React Native architecture**
   
   "React Native's architecture centers around a multi-threaded model that separates responsibilities:
   
   The JavaScript thread runs our React code and business logic. When state changes trigger UI updates, the JS thread calculates what needs to change and sends those instructions through the bridge.
   
   The bridge is critical as it serializes data between JavaScript and native code. It's asynchronous by design, which sometimes creates performance challenges for operations requiring quick feedback.
   
   The shadow thread (also called the layout thread) uses Yoga, Facebook's cross-platform layout engine, to calculate UI layouts based on flexbox principles. This keeps expensive layout calculations off the main thread.
   
   Finally, the main/UI thread handles rendering actual native components and user interactions. It receives instructions from the layout calculations and renders the appropriate native views.
   
   This separation provides flexibility but introduces overhead in communication. In my projects, I've learned to be mindful of bridge traffic, especially for animations or gestures that require high performance."

3. **What is the new architecture in React Native?**
   
   "React Native's new architecture represents a significant evolution addressing several performance and developer experience challenges in the original design.
   
   Fabric is the reimagined rendering system that makes UI operations synchronous rather than asynchronous. This enables consistent thread priorities and reduces frame drops during complex UI updates. I'm particularly excited about how Fabric allows for view flattening to reduce view hierarchy depth.
   
   TurboModules replace the old Native Modules system with a more efficient, type-safe approach. Instead of loading all native modules at startup, TurboModules are loaded on-demand, improving startup time. They also eliminate the need for configuration in multiple places.
   
   JSI (JavaScript Interface) is perhaps the most transformative addition. It replaces the serialization-based bridge with direct JavaScript to C++ communication. This allows JavaScript to hold references to C++ objects and vice versa, enabling synchronous communication without the performance overhead of serialization.
   
   CodeGen ties everything together by automatically generating type-safe native interface code from JavaScript specifications. This reduces manual work and errors when creating native modules.
   
   The transition to this architecture requires careful planning, but projects I've migrated have seen significant performance improvements, especially in animation smoothness and app startup time."

### Component Patterns & State Management

4. **How would you manage state in a complex React Native app?**
   
   "State management in complex React Native apps requires a strategic, layered approach. I typically organize state into different categories based on scope and persistence needs.
   
   For local component state that doesn't need to be shared, I use React's built-in `useState` or `useReducer` hooks. For example, form input values or UI toggles can be efficiently managed this way. This keeps the component logic encapsulated and prevents unnecessary re-renders elsewhere.
   
   When state needs to be shared across related components but doesn't affect the entire app, React's Context API offers a good balance of simplicity and performance. I've used this for theme settings or user preferences that affect a specific feature area.
   
   For truly global state with complex interactions, I prefer Redux for larger teams because it enforces a predictable data flow and offers excellent debugging capabilities with Redux DevTools. MobX is another good option when you want less boilerplate, though I find its reactivity model slightly less explicit for team environments.
   
   I've also started using Recoil or Jotai for atomic state management in newer projects. These libraries offer a nice compromise with Redux-like global access but with less boilerplate and more fine-grained control over what components re-render.
   
   The key is to avoid a one-size-fits-all approach. By leveraging multiple state management techniques in the same app, we can match the solution to the specific problem rather than forcing everything into a single paradigm."

5. **Explain the difference between controlled and uncontrolled components**
   
   "Controlled and uncontrolled components represent two fundamentally different approaches to managing form data in React and React Native applications.
   
   In controlled components, React explicitly manages the component's state. We provide a value prop and an onChange handler that updates the state when the user interacts with the component. For example:
   
   ```jsx
   const [text, setText] = useState('');
   return <TextInput value={text} onChangeText={setText} />;
   ```
   
   This approach gives us precise control over the input's behavior. We can format data as it's entered, perform validation on every keystroke, or conditionally enable/disable form submission. The component's state is the single source of truth.
   
   Uncontrolled components, on the other hand, manage their own internal state. We access their values using refs rather than props:
   
   ```jsx
   const inputRef = useRef(null);
   // Later: const value = inputRef.current.value;
   return <TextInput ref={inputRef} defaultValue="" />;
   ```
   
   Uncontrolled components can be simpler to implement for basic forms and may have slightly better performance since they cause fewer re-renders. However, they make it harder to implement features like real-time validation or conditional formatting.
   
   In practice, I generally prefer controlled components in React Native because they make the data flow more predictable and easier to debug. The performance difference is rarely significant enough to justify the reduced control, especially for forms with validation requirements or complex interactions."

6. **How do you handle forms in React Native?**
   
   "Form handling in React Native requires thoughtful implementation since we don't have the built-in form submission behavior of web browsers.
   
   For simpler forms, I start with controlled inputs using React state. This gives me direct access to field values at any time and allows for real-time validation:
   
   ```jsx
   const [formState, setFormState] = useState({
     name: '',
     email: '',
     errors: {}
   });
   
   const updateField = (field, value) => {
     setFormState(prev => ({
       ...prev,
       [field]: value,
       errors: {
         ...prev.errors,
         [field]: validateField(field, value)
       }
     }));
   };
   ```
   
   For more complex forms, I leverage libraries like Formik or React Hook Form. These libraries handle state management, validation, error messages, and form submission with much less boilerplate code.
   
   For validation, I typically implement a combination of:
   
   - Field-level validation for immediate feedback as users type
   - Form-level validation for validations that depend on multiple fields
   - Submit validation as a final check before processing
   
   I've found Yup schema validation particularly valuable when paired with Formik, as it provides a declarative way to define validation rules:
   
   ```jsx
   const validationSchema = Yup.object().shape({
     email: Yup.string()
       .email('Invalid email')
       .required('Email is required'),
     password: Yup.string()
       .min(8, 'Password must be at least 8 characters')
       .required('Password is required')
   });
   ```
   
   For accessibility, I ensure proper keyboard types are set for different input fields and implement proper tab order with the `returnKeyType` and `onSubmitEditing` props to create a smooth form completion experience."

### Navigation & Data Flow

7. **Compare different navigation options in React Native**
   
   "Navigation is a critical aspect of the mobile user experience, and React Native offers several approaches with different trade-offs.
   
   React Navigation is my go-to solution for most projects due to its extensive community support, excellent documentation, and purely JavaScript implementation. It offers stack, tab, drawer, and material top-tab navigators that can be nested to create complex navigation hierarchies. Being JavaScript-based means it's easy to customize and debug, though this can sometimes impact performance on older devices.
   
   React Native Navigation by Wix takes a different approach with a fully native implementation. This results in better performance, especially for complex transitions and gestures, and it feels more like standard iOS/Android navigation. However, it requires additional native configuration and can be more challenging to debug when issues arise.
   
   When choosing between them, I consider factors like:
   
   - Team familiarity: React Navigation has a gentler learning curve
   - Performance requirements: React Native Navigation performs better for complex animations
   - Customization needs: React Navigation is easier to customize in JavaScript
   - Maintenance considerations: React Navigation's larger community means faster bug fixes
   
   I've personally used both in production apps. For a recent e-commerce app with complex animations, we chose React Native Navigation for its performance benefits. For a content-heavy app with simpler transitions, React Navigation was more than sufficient and saved us development time.
   
   Regardless of the library choice, I ensure we implement deep linking support from the beginning rather than adding it later, as it often influences the navigation structure."

8. **How would you handle deep linking in a React Native app?**
   
   "Deep linking is essential for a seamless user experience, allowing users to navigate directly to specific content from outside the app. Implementing it in React Native requires both native configuration and JavaScript routing logic.
   
   First, we need to configure platform-specific settings:
   
   For iOS, we update the Info.plist file to register URL schemes and add associated domains for universal links. For Android, we modify the AndroidManifest.xml with intent filters that specify the URL schemes and paths our app should handle.
   
   Within our React Navigation setup, we define the linking configuration that maps external URLs to internal navigation states:
   
   ```jsx
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
   
   // Then in NavigationContainer:
   <NavigationContainer linking={linking}>
     {/* ... */}
   </NavigationContainer>
   ```
   
   For testing deep links during development, I use the React Native CLI command:
   ```
   npx react-native run-android --variant=debug -- --url="myapp://user/123"
   ```
   
   I also implement proper error handling for malformed URLs and graceful fallbacks when the requested content isn't available. For example, if a user clicks a link to a product that no longer exists, we should show a friendly error page rather than crashing.
   
   In production apps, I've found it valuable to implement deep link analytics to understand how users are entering the app, which helps inform marketing and user experience decisions."

### Performance

9. **How would you debug performance issues in a React Native app?**
   
   "Debugging performance issues in React Native requires a systematic approach and the right tools for different layers of the stack.
   
   I start with React DevTools profiler to identify components that are rendering too frequently or taking too long to render. This helps pinpoint unnecessary re-renders or expensive calculations in the component tree. Looking at the flame graph visualization often reveals components that shouldn't be re-rendering based on their props or context changes.
   
   For native performance issues, Systrace is invaluable. It provides a timeline view of CPU usage across different threads, helping identify when the JS thread or UI thread is blocked. I've found this particularly useful for diagnosing animation jank or slow response to touch events. The key insight is often seeing when the JavaScript thread is busy while the UI thread is waiting, or vice versa.
   
   Flipper has become my go-to debugging environment because it combines multiple tools in one interface. Its performance plugin shows real-time CPU, memory, and network usage. The layout inspector helps identify deep view hierarchies that might be causing performance issues. The network inspector shows slow API calls that might be blocking the JS thread.
   
   For JavaScript-specific issues, Chrome/Safari dev tools allow me to profile JavaScript execution and memory usage. Finding memory leaks often involves taking heap snapshots and comparing them over time to see what objects aren't being garbage collected.
   
   In one project, we faced mysterious UI freezes that occurred sporadically. Using Systrace, we identified that a third-party analytics library was synchronously writing to disk on the JS thread. Switching to asynchronous batch writes solved the issue. This reinforced my practice of always measuring performance impact before and after adding new libraries."

10. **What causes performance bottlenecks in React Native and how to solve them?**
    
    "Performance bottlenecks in React Native typically fall into several categories, each requiring specific optimization techniques.
    
    Unnecessary re-renders are one of the most common issues I encounter. When parent components re-render, they cause all children to re-render by default. To combat this, I apply memoization strategically:
    
    - `React.memo()` for functional components that render the same output given the same props
    - `useMemo()` to cache expensive calculated values
    - `useCallback()` to prevent function recreation on each render
    
    For example, in a chat application I worked on, wrapping message list items in `React.memo()` and using `useCallback()` for event handlers reduced render time by nearly 40%.
    
    Large lists present another common challenge. When rendering hundreds or thousands of items, performance can degrade significantly. I address this by:
    
    - Using `FlatList` or `SectionList` instead of mapping over arrays in `ScrollView`
    - Implementing `getItemLayout` to avoid measurement calculations
    - Using `windowSize` and `maxToRenderPerBatch` props to control rendering batch size
    - Simplifying item components and applying memoization
    
    JS thread blockage occurs when time-consuming JavaScript operations prevent UI updates. Solutions include:
    
    - Moving computation to web workers where possible
    - Using `InteractionManager.runAfterInteractions()` to defer non-critical work
    - Breaking up heavy computations with `requestAnimationFrame()` to yield to the JS event loop
    
    For image handling, I've implemented:
    
    - Progressive loading for large images
    - Proper caching headers on the server
    - Image pre-loading for critical screens
    - Using FastImage library which adds additional caching and performance optimizations
    
    In one e-commerce app, we reduced perceived loading time by 70% by implementing progressive JPEG loading and intelligent pre-caching of product images based on user browsing patterns."

11. **Explain the purpose of `setNativeProps`**
    
    "`setNativeProps` is a powerful yet specialized tool in the React Native optimization toolkit that allows direct modification of native component properties without going through the React reconciliation process.
    
    When we call `setNativeProps` on a component, it bypasses the normal React diffing algorithm and directly updates the underlying native view. This is particularly valuable in two scenarios:
    
    First, for continuous animations or gestures where performance is critical. For example, when implementing a custom slider component, using `setNativeProps` to update the position during a drag operation avoids the overhead of re-rendering the entire component hierarchy on every frame:
    
    ```jsx
    onPanResponderMove: (evt, gestureState) => {
      // Direct update without re-rendering
      this.sliderRef.current.setNativeProps({
        style: { transform: [{ translateX: gestureState.dx }] }
      });
    }
    ```
    
    Second, when we need to trigger imperative animations that would be difficult to express declaratively. This can be useful for one-off animations or interactions that don't fit well into the React paradigm.
    
    However, `setNativeProps` comes with important caveats. It steps outside React's declarative model, making code harder to reason about and test. It also doesn't work with functional components unless you use `forwardRef`. 
    
    In modern React Native, I find myself using `setNativeProps` less frequently as the Animated API with `useNativeDriver: true` and libraries like Reanimated provide better abstractions for performance-critical animations while preserving more of React's declarative model. Still, understanding `setNativeProps` remains valuable for optimizing edge cases and comprehending React Native's internals."

### Testing & Development Workflow

12. **How do you test React Native applications?**
    
    "Testing React Native applications requires a comprehensive strategy covering different levels of the testing pyramid.
    
    For unit testing, Jest is my foundation. I test individual functions, hooks, and utilities in isolation. For Redux or other state management, I test reducers, selectors, and action creators separately. Jest's snapshot testing is particularly useful for ensuring UI components don't change unexpectedly.
    
    ```jsx
    test('reducer handles ADD_ITEM correctly', () => {
      const initialState = { items: [] };
      const action = { type: 'ADD_ITEM', payload: { id: 1, name: 'Test' } };
      expect(reducer(initialState, action)).toEqual({
        items: [{ id: 1, name: 'Test' }]
      });
    });
    ```
    
    For component testing, React Native Testing Library has been transformative. It encourages testing from a user perspective by focusing on what appears on screen rather than implementation details:
    
    ```jsx
    test('renders item details correctly', async () => {
      const { getByText, getByTestId } = render(<ItemDetail item={mockItem} />);
      expect(getByText(mockItem.name)).toBeDefined();
      expect(getByTestId('price')).toHaveTextContent(`$${mockItem.price}`);
      
      // Simulating user interaction
      fireEvent.press(getByText('Add to Cart'));
      expect(mockAddToCart).toHaveBeenCalledWith(mockItem.id);
    });
    ```
    
    For end-to-end testing, I use Detox for iOS and Android testing on actual devices or emulators. It allows us to simulate real user journeys:
    
    ```javascript
    describe('Login flow', () => {
      it('should login successfully', async () => {
        await element(by.id('email')).typeText('test@example.com');
        await element(by.id('password')).typeText('password');
        await element(by.text('Login')).tap();
        await expect(element(by.text('Welcome'))).toBeVisible();
      });
    });
    ```
    
    Manual testing on physical devices remains essential, especially for testing gesture interactions, animations, and platform-specific behaviors. I maintain a matrix of devices covering different OS versions, screen sizes, and manufacturers.
    
    In my experience, the most effective testing strategy combines automated tests for regression catching with exploratory manual testing for edge cases and real-world usage patterns. For critical applications, I also implement monitoring and error reporting in production using services like Sentry to catch issues that slip through testing."

13. **What's your development workflow for React Native?**
    
    "My React Native development workflow has evolved to maximize productivity while ensuring code quality through multiple feedback loops.
    
    I start with a strong local development environment. Fast Refresh is a game-changer that allows me to see changes instantly without losing component state. I typically have multiple simulators/emulators running simultaneously (usually iPhone and Android) to catch platform-specific issues early. For complex layouts, I'll also add a tablet device to ensure responsiveness across form factors.
    
    Flipper has become central to my debugging workflow. Its React DevTools integration helps inspect component hierarchies and props, while the network inspector is invaluable for API debugging. The layout inspector helps identify styling issues, and the crash reporter quickly pinpoints runtime errors.
    
    For state management debugging, I use either Redux DevTools or the React Context DevTools depending on the project's architecture. Being able to time-travel through state changes has saved countless hours tracking down complex state bugs.
    
    I integrate TypeScript from day one in all new projects. The immediate feedback on type errors prevents entire classes of bugs, especially when integrating with APIs or refactoring.
    
    For code quality, I maintain a pre-commit hook with ESLint, Prettier, and TypeScript validation. We also run Jest tests on commit to catch regressions early. Having this automation ensures code standards without slowing down development.
    
    Our CI/CD pipeline automatically builds both iOS and Android versions for each PR, with screenshots of key screens compared against baselines to catch visual regressions. We distribute these builds to stakeholders through services like App Center or TestFlight for early feedback.
    
    For larger teams, we've implemented feature flags to allow merging incomplete features into the main branch while keeping them disabled in production until ready. This reduces merge conflicts and keeps pull requests smaller and more focused.
    
    This multi-layered approach means I get feedback at every level—from immediate visual updates with Fast Refresh to automated tests in CI—ensuring both development speed and code quality."

## Real-world Scenarios/Challenges with Solutions (15%)

### 1. App Startup Optimization

**Problem**: Your React Native app takes 3-4 seconds to become interactive after launch, causing users to abandon the app before engaging with content.

**Comprehensive Solution**:

"To optimize app startup time, I implement a multi-faceted approach addressing both perceived and actual performance:

First, I implement a native splash screen using packages like `react-native-bootsplash` rather than JavaScript-based solutions. This shows instantly while the JS bundle loads, giving users immediate feedback. For Android, I ensure the splash screen matches the app's background color to avoid visible transitions.

Next, I enable the Hermes JavaScript engine, which significantly reduces JavaScript parsing time, memory usage, and overall bundle size. In a recent e-commerce app, this alone reduced TTI (Time To Interactive) by 30%.

For code organization, I implement lazy loading for non-critical components using dynamic imports. This keeps the initial bundle smaller:

```jsx
const Settings = React.lazy(() => import('./screens/Settings'));

// In router
<React.Suspense fallback={<LoadingIndicator />}>
  <Settings />
</React.Suspense>
```

To reduce bundle size further, I configure RAM bundles (indexed file format) for Android and enable bundle splitting on iOS. This allows loading only the required JavaScript code segments rather than the entire bundle.

I also defer non-essential API calls and heavy calculations using InteractionManager:

```jsx
componentDidMount() {
  InteractionManager.runAfterInteractions(() => {
    // Run expensive operations after animations complete
    this.fetchNonCriticalData();
  });
}
```

By combining these techniques, we typically see startup time improvements of 50-70% depending on device capabilities."

### 2. Offline-First Experience

**Problem**: Users experience data loss or functionality breaks when network connectivity is inconsistent, particularly in areas with spotty mobile coverage.

**Comprehensive Solution**:

"Creating a robust offline-first experience requires thinking about data persistence, synchronization, and user communication holistically.

For data persistence, I've found MMKV offers the best performance for key-value storage needs, while SQLite (via libraries like WatermelonDB) provides robust relational data storage with indexing capabilities for complex data models.

Here's my approach to building a proper offline-first experience:

First, I implement a caching layer that automatically stores API responses:

```jsx
async function fetchWithCache(url, options = {}) {
  try {
    // Try to fetch fresh data
    const response = await fetch(url, options);
    const data = await response.json();
    
    // Store in cache
    await MMKV.set(`cache_${url}`, JSON.stringify({
      timestamp: Date.now(),
      data
    }));
    
    return data;
  } catch (error) {
    // Network error, try to return cached data
    const cached = await MMKV.getString(`cache_${url}`);
    if (cached) {
      const { data } = JSON.parse(cached);
      // Flag that this is cached data
      return { ...data, _fromCache: true };
    }
    throw error;
  }
}
```

For user-generated content like form submissions or actions, I implement a request queue:

```jsx
async function queueAction(action, payload) {
  // Add to queue
  const queue = JSON.parse(await AsyncStorage.getItem('actionQueue') || '[]');
  queue.push({ action, payload, timestamp: Date.now() });
  await AsyncStorage.setItem('actionQueue', JSON.stringify(queue));
  
  // Attempt to process queue if online
  if (await NetInfo.fetch().then(state => state.isConnected)) {
    processQueue();
  }
}
```

For synchronization, I establish clear conflict resolution strategies. In a collaborative app, we used timestamps plus device IDs to determine which changes take precedence when conflicts occur.

I also provide clear UI indicators about offline status and queued actions:

```jsx
function OfflineBanner({ isOnline }) {
  if (isOnline) return null;
  
  return (
    <Animated.View style={styles.offlineBanner}>
      <Text>You're offline. Changes will sync when connection returns.</Text>
    </Animated.View>
  );
}
```

This comprehensive approach has reduced support tickets related to data loss by 90% in applications deployed to regions with unreliable connectivity."

### 3. Native Integration Complexity

**Problem**: Your React Native app needs to access device capabilities not exposed through React Native's core modules, such as advanced biometric authentication or specialized hardware.

**Comprehensive Solution**:

"When faced with integrating complex native functionality, I follow a systematic approach to minimize development time and maintenance overhead.

First, I thoroughly research existing community libraries that might already solve the problem. Many seemingly niche requirements have been addressed by the community, and these solutions come with the benefit of being battle-tested across devices.

If no suitable library exists, I evaluate whether the functionality belongs in a standalone native module or should be added to an existing one. For standalone functionality, I create a proper native module:

For iOS (Objective-C):
```objective-c
@implementation RNCustomBiometrics

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(authenticateWithOptions:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  // Implementation accessing native iOS APIs
  LAContext *context = [[LAContext alloc] init];
  NSError *error;
  
  if ([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error]) {
    // Proceed with authentication
  } else {
    reject(@"biometric_error", @"Device cannot use biometrics", error);
  }
}
@end
```

For Android (Kotlin):
```kotlin
class CustomBiometricsModule(reactContext: ReactApplicationContext) : 
    ReactContextBaseJavaModule(reactContext) {
  
  override fun getName() = "CustomBiometrics"
  
  @ReactMethod
  fun authenticateWithOptions(options: ReadableMap, promise: Promise) {
    // Implementation accessing native Android APIs
    val biometricPrompt = BiometricPrompt(currentActivity!!, 
      ContextCompat.getMainExecutor(reactContext),
      object : BiometricPrompt.AuthenticationCallback() {
        // Handle auth results
      })
      
    // Show prompt
  }
}
```

For JavaScript interface:
```javascript
import { NativeModules } from 'react-native';
const { CustomBiometrics } = NativeModules;

export function authenticate(options = {}) {
  return CustomBiometrics.authenticateWithOptions(options);
}
```

For newer React Native projects, I implement this as a TurboModule instead:

```javascript
// JS specification
export interface Spec extends TurboModule {
  authenticateWithOptions(options: Object): Promise<Object>;
}

export default TurboModuleRegistry.get<Spec>('CustomBiometrics');
```

In one healthcare app, we needed custom Bluetooth integration with medical devices that wasn't supported by existing libraries. By implementing our own native module with a clean JavaScript API, we were able to maintain the React Native developer experience while still accessing the device's full capabilities."

### 4. Cross-Platform UI Consistency

**Problem**: Your app looks and behaves inconsistently across iOS and Android, creating maintenance challenges and compromising brand identity.

**Comprehensive Solution**:

"Achieving UI consistency across platforms while respecting platform conventions requires a strategic approach to component design.

I start by creating a comprehensive design system with platform-aware components. Rather than having separate iOS and Android codebases, I abstract platform differences into components:

```jsx
// Core Button component with platform awareness
const Button = ({ title, onPress, style, ...props }) => {
  const theme = useTheme();
  
  // Platform-specific styling
  const dynamicStyles = Platform.select({
    ios: {
      shadowColor: 'rgba(0,0,0,0.2)',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      // iOS-specific properties
    },
    android: {
      elevation: 4,
      // Android-specific properties
    }
  });

  return (
    <Pressable
      style={[
        styles.button,
        dynamicStyles,
        style
      ]}
      android_ripple={{ color: theme.colors.ripple }}
      onPress={onPress}
      {...props}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
```

For more complex components that require entirely different implementations, I use a higher-level abstraction:

```jsx
// DatePicker.js
import DatePickerIOS from './DatePickerIOS';
import DatePickerAndroid from './DatePickerAndroid';

export default Platform.select({
  ios: () => DatePickerIOS,
  android: () => DatePickerAndroid,
})();
```

I maintain a centralized theme object with platform-aware values for colors, typography, and spacing:

```jsx
const baseTheme = {
  colors: {
    primary: '#3498db',
    text: '#2c3e50',
    // shared colors
  },
  // Base values
};

export const theme = {
  ...baseTheme,
  // Platform-specific overrides
  ...Platform.select({
    ios: {
      fonts: {
        regular: 'System',
        medium: 'System',
      },
      spacing: {
        unit: 8,
      }
    },
    android: {
      fonts: {
        regular: 'Roboto',
        medium: 'Roboto-Medium',
      },
      spacing: {
        unit: 8,
      }
    }
  })
};
```

To ensure consistent behavior, I implement a testing strategy that verifies components across platforms:

```javascript
describe('Button Component', () => {
  it('should render correctly on iOS', () => {
    Platform.OS = 'ios';
    const { toJSON } = render(<Button title="Press me" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correctly on Android', () => {
    Platform.OS = 'android';
    const { toJSON } = render(<Button title="Press me" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
```

This approach has helped our teams maintain a consistent brand experience while still respecting platform conventions. In a recent fintech app, we achieved 95% visual consistency across platforms while maintaining platform-native feel for interactions and animations."

### 5. Animation Performance

**Problem**: Complex animations in your app appear jittery on mid-range Android devices, causing a poor user experience compared to native apps.

**Comprehensive Solution**:

"Animation performance is one of the most challenging aspects of React Native development, particularly for complex UI interactions that need to feel native.

The key insight is understanding that any animation that requires JavaScript thread communication during each frame will likely suffer from jank. My approach focuses on moving animation logic off the JavaScript thread wherever possible.

First, I leverage the Animated API with `useNativeDriver: true` for simple animations:

```jsx
const fadeAnim = useRef(new Animated.Value(0)).current;

const fadeIn = () => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 300,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true, // Critical flag
  }).start();
};

return (
  <Animated.View style={{ opacity: fadeAnim }}>
    {/* Content */}
  </Animated.View>
);
```

For complex animations that can't be handled by the standard Animated API with native driver, I use Reanimated 2, which uses worklets to run animation logic directly on the UI thread:

```jsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming
} from 'react-native-reanimated';

function AnimatedCard() {
  const offset = useSharedValue(0);
  const rotation = useSharedValue(0);
  
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: offset.value },
        { rotateZ: `${rotation.value}deg` }
      ],
    };
  });
  
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = offset.value;
    },
    onActive: (event, ctx) => {
      offset.value = ctx.startY + event.translationY;
      rotation.value = interpolate(
        event.translationX,
        [-200, 0, 200],
        [-30, 0, 30]
      );
    },
    onEnd: () => {
      offset.value = withSpring(0);
      rotation.value = withTiming(0);
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.card, animatedStyles]}>
        {/* Card content */}
      </Animated.View>
    </PanGestureHandler>
  );
}
```

For layout animations, which can be particularly challenging, I'm careful to avoid:
1. Animating properties that trigger layout recalculation during the animation
2. Animated components with deeply nested children

In a dating app with complex card swiping interactions, switching from the standard Animated API to Reanimated with proper gesture handling improved animation frame rates from 30-40fps to a consistent 60fps, even on mid-range devices.

Additionally, for image-heavy animations, I pre-cache images and use techniques like progressive loading to ensure smooth transitions:

```jsx
// Pre-cache images
Image.prefetch(imageUrl).then(() => {
  // Start animation once image is cached
  startAnimation();
});
```

These animation performance techniques have been critical in achieving native-quality experiences in apps where fluid interaction is central to the user experience."
```

## Key Optimizations & Best Practices (10%)

### 1. **Memory Management**

"In React Native, effective memory management is critical for preventing crashes and ensuring consistent performance. I implement several strategic practices:

First, I always clean up subscriptions, timers, and event listeners in useEffect cleanup functions:

```jsx
useEffect(() => {
  const subscription = SomeAPI.subscribe(handler);
  const intervalId = setInterval(checkStatus, 5000);
  
  return () => {
    subscription.unsubscribe();
    clearInterval(intervalId);
  };
}, [dependencies]);
```

I'm vigilant about avoiding memory leaks from closures. A common source is storing references to components or their state in external objects that outlive the component. Instead, I use WeakMaps when I need to associate data with component instances.

To identify memory issues, I routinely monitor memory usage with Flipper's memory plugin. This helps catch gradual memory increases that indicate leaks. For more sophisticated analysis, I use Xcode Instruments for iOS and Android Profiler to identify retained objects.

In one enterprise app, we discovered a memory leak where event listeners for device orientation changes weren't being removed. Implementing proper cleanup reduced memory usage by 15% and eliminated crashes on low-end devices."

### 2. **Bundle Size Optimization**

"Bundle size directly impacts download size, installation time, and startup performance. My optimization strategy includes:

Enabling the Hermes JavaScript engine, which provides smaller bundle sizes and faster startup. On average, Hermes reduces bundle size by 30-40% and improves startup time by a similar margin.

For Android, I configure ProGuard/R8 aggressively to remove unused code from native dependencies:

```groovy
// In app/build.gradle
def enableProguardInReleaseBuilds = true

// Custom ProGuard rules
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
```

I implement code-splitting strategies with RAM bundles (indexed file format) on Android and standard bundle splitting on iOS. This allows the app to load only the necessary parts of the JavaScript bundle:

```javascript
// In metro.config.js
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
  },
  serializer: {
    // Enable RAM format
    createModuleIdFactory: require('metro/src/lib/createModuleIdFactory'),
    processModuleFilter: require('metro/src/lib/processModuleFilter'),
  },
};
```

I also use the Metro bundler's analyzer to identify large dependencies and replace them with lighter alternatives when possible. This analysis once helped us identify that a single date manipulation library was adding over 300KB to our bundle."

### 3. **UI Responsiveness**

"Maintaining 60 FPS is essential for a native feel. My approach to UI responsiveness focuses on:

Never blocking the main thread with heavy operations. I move all expensive calculations off the main thread by deferring non-essential work:

```jsx
// Instead of doing this directly in a render or event handler
const expensiveOperation = () => {
  InteractionManager.runAfterInteractions(() => {
    // Complex calculations here
    setResult(calculateResult());
  });
};
```

For operations that must happen during animations or interactions, I use requestAnimationFrame to yield to the event loop:

```jsx
const processLargeDataSet = (data, onProgress) => {
  let index = 0;
  
  function process() {
    const chunk = data.slice(index, index + 100);
    const results = processChunk(chunk);
    index += 100;
    
    if (index < data.length) {
      onProgress(index / data.length);
      requestAnimationFrame(process);
    } else {
      onProgress(1);
    }
  }
  
  requestAnimationFrame(process);
};
```

For animations, I use Reanimated 2's worklets to run animation calculations directly on the UI thread:

```jsx
const animatedStyle = useAnimatedStyle(() => {
  // This runs on the UI thread, not JS thread
  return {
    opacity: withTiming(isVisible.value ? 1 : 0),
    transform: [{ scale: withSpring(isVisible.value ? 1 : 0.8) }]
  };
});
```

These practices helped us achieve consistently smooth 60 FPS scrolling and animations in a media-heavy application, even during complex data operations."

### 4. **Code Organization**

"Proper code organization is crucial for maintainability and scalability. I implement:

A feature-based folder structure rather than type-based, which groups related code together regardless of its technical type:

```
src/
├── features/
│   ├── authentication/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── screens/
│   │   ├── services/
│   │   └── store/
│   ├── payments/
│   └── profile/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── services/
└── app.js
```

I favor component composition over inheritance. Instead of extending components, I build higher-order components or use render props for reusable behaviors:

```jsx
// Instead of inheritance, use composition
const Button = ({ children, ...props }) => (
  <Pressable {...props}>
    <Text>{children}</Text>
  </Pressable>
);

const IconButton = ({ icon, children, ...props }) => (
  <Button {...props}>
    <Icon name={icon} />
    {children}
  </Button>
);
```

I extract reusable logic into custom hooks for better testability and reuse:

```jsx
// Custom hook for form field validation
function useField(initialValue = '', validators = []) {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState([]);
  
  const validate = useCallback(() => {
    const newErrors = validators
      .map(validator => validator(value))
      .filter(Boolean);
    
    setErrors(newErrors);
    return newErrors.length === 0;
  }, [value, validators]);
  
  return { value, setValue, errors, validate };
}
```

This organization has significantly reduced development time when onboarding new team members, as they can quickly locate relevant code without understanding the entire application."

### 5. **Error Handling**

"Robust error handling prevents poor user experiences and helps with debugging. My approach includes:

Implementing a global error boundary to catch and handle JS errors gracefully:

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, info) {
    logErrorToService(error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return <FallbackScreen error={this.state.error} onRetry={this.resetError} />;
    }
    return this.props.children;
  }
  
  resetError = () => {
    this.setState({ hasError: false, error: null });
  }
}
```

For API error handling, I implement a consistent approach with retry logic and user feedback:

```jsx
const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, response.statusText, errorData);
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      // Handle timeout
    } else if (error instanceof ApiError) {
      // Handle specific API errors
      if (error.status === 401) {
        // Handle authentication errors
      }
    } else {
      // Handle network or other errors
    }
    
    throw error;
  }
};
```

I integrate crash reporting tools like Sentry or Firebase Crashlytics configured to capture both JavaScript and native errors. This includes proper source maps upload for JavaScript errors and breadcrumbs for user actions before crashes.

After implementing comprehensive error tracking in a financial app, we were able to reduce crash rates from 2.1% to 0.3% by systematically addressing the root causes identified through detailed error reports."

## Advanced Talking Points (5%)

### 1. **React Native Internals**

"Understanding React Native's architecture at a deeper level has been invaluable for optimizing complex applications.

The transition from the Bridge to JSI (JavaScript Interface) represents a fundamental architectural shift. The original bridge used serialization/deserialization for all communication between JS and native code, creating significant overhead. Each message had to be encoded to JSON, queued, transferred, then decoded—all asynchronously.

JSI, however, allows JavaScript to hold direct references to C++ objects and invoke methods on them synchronously. This eliminates serialization overhead and enables more efficient communication patterns:

```cpp
// C++ host object exposed to JavaScript
class HostObject : public jsi::HostObject {
  jsi::Value get(jsi::Runtime& runtime, const jsi::PropNameID& name) override {
    auto propertyName = name.utf8(runtime);
    
    if (propertyName == "performNativeTask") {
      // Return a function that can be called from JS
      return jsi::Function::createFromHostFunction(
        runtime,
        name,
        1,  // argument count
        [](jsi::Runtime& runtime,
           const jsi::Value& thisValue,
           const jsi::Value* arguments,
           size_t count) -> jsi::Value {
          // Direct C++ execution with no serialization
          int result = performNativeCalculation(arguments[0].asNumber());
          return jsi::Value(result);
        }
      );
    }
    
    return jsi::Value::undefined();
  }
};
```

C++ TurboModules leverage JSI to provide synchronous access to native modules, lazy loading, and strong typing through CodeGen. This is vastly superior to the legacy bridge system where all native modules had to be initialized at startup and all communication was asynchronous.

The shadow tree's layout computation is another fascinating aspect. React Native uses Yoga, a cross-platform layout engine based on Flexbox. When React renders, it produces a shadow tree of native components. This shadow tree runs layout calculations on a dedicated thread, using Yoga to determine positions and dimensions before sending the final layout to the main thread for rendering. This multi-threaded approach prevents UI jank by keeping layout calculations off the main thread.

Understanding these internals has helped me make informed architecture decisions, like when to use Animated vs Reanimated, or when to move logic to native modules for better performance."

### 2. **Custom Renderer Implementation**

"React's architecture allows for custom renderers beyond DOM and React Native, which creates interesting possibilities for specialized applications.

React's reconciliation process is renderer-agnostic. It works with a virtual representation of the UI, then uses a renderer to translate it to platform-specific instructions. The reconciliation algorithm itself doesn't care if it's rendering to DOM, Native views, WebGL, or even a command-line interface.

In React Native, the renderer creates and updates platform-specific UI components. When React determines a component needs updating, it calls methods on the renderer, which then communicates with the native platform to create or modify UI elements.

I've explored implementing custom renderers for specialized use cases. For example, in an IoT project, we created a minimal React renderer targeting a custom display protocol:

```javascript
const MyRenderer = ReactReconciler({
  supportsMutation: true,
  
  createInstance(type, props, rootContainerInstance, hostContext, internalHandle) {
    // Create our custom UI elements
    return createCustomElement(type, props);
  },
  
  appendChildToContainer(container, child) {
    container.appendChild(child);
  },
  
  // Other required methods
  
  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    updateCustomElement(instance, newProps);
  },
});

// Using the custom renderer
const container = MyRenderer.createContainer(rootElement);
MyRenderer.updateContainer(<App />, container, null, () => {});
```

Beyond iOS and Android, React Native's architecture principles can be applied to create renderers for platforms like tvOS (Apple TV), Windows (via React Native for Windows), macOS, and even smart watches or embedded systems. Microsoft's use of React Native for Windows and macOS demonstrates how far this approach can scale.

This understanding of React's rendering model provides valuable perspective on optimization strategies and helps in architecting truly cross-platform applications that might need to target emerging platforms."

### 3. **Native UI Component Writing**

"Creating native UI components from scratch is essential when you need to leverage platform capabilities beyond what's available through React Native's core components.

I approach native component development differently for each platform while maintaining a clean unified JavaScript API. For iOS, I implement a RCTViewManager subclass:

```objective-c
// MyCustomViewManager.h
#import <React/RCTViewManager.h>

@interface MyCustomViewManager : RCTViewManager
@end

// MyCustomViewManager.m
@implementation MyCustomViewManager

RCT_EXPORT_MODULE()

- (UIView *)view {
  return [[MyCustomView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(customProperty, NSString)
RCT_EXPORT_VIEW_PROPERTY(onCustomEvent, RCTDirectEventBlock)

@end
```

For Android, I create a ViewManager class:

```java
public class MyCustomViewManager extends SimpleViewManager<MyCustomView> {
  public static final String REACT_CLASS = "MyCustomView";
  
  @Override
  public String getName() {
    return REACT_CLASS;
  }
  
  @Override
  protected MyCustomView createViewInstance(ThemedReactContext reactContext) {
    return new MyCustomView(reactContext);
  }
  
  @ReactProp(name = "customProperty")
  public void setCustomProperty(MyCustomView view, String property) {
    view.setCustomProperty(property);
  }
  
  @Override
  public Map getExportedCustomDirectEventTypeConstants() {
    return MapBuilder.of(
      "onCustomEvent", 
      MapBuilder.of("registrationName", "onCustomEvent")
    );
  }
}
```

For the JavaScript interface, I create a component that provides a consistent API while handling platform differences internally:

```javascript
import { requireNativeComponent, Platform } from 'react-native';

const NativeCustomView = requireNativeComponent('MyCustomView');

export const CustomView = (props) => {
  // Platform-specific props or behaviors can be handled here
  const platformProps = Platform.select({
    ios: { iosSpecificProp: props.someValue },
    android: { androidSpecificProp: props.someValue }
  });
  
  return <NativeCustomView {...props} {...platformProps} />;
};
```

When exposing native APIs, I ensure methods are properly typed and documented. With the new architecture, I now use Codegen to generate type-safe interfaces:

```javascript
// Native component spec
import type { ViewProps } from 'react-native';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

interface NativeProps extends ViewProps {
  customProperty: string;
  onCustomEvent: (event: { nativeEvent: { value: string } }) => void;
}

export default codegenNativeComponent<NativeProps>('MyCustomView') as HostComponent<NativeProps>;
```

This approach has been particularly valuable when integrating specialized UI components like custom charts, camera controls, or AR features that leverage platform-specific APIs."

### 4. React 18 Features in React Native Context

"React 18 introduces powerful new features that are gradually making their way into React Native, transforming how we build mobile applications.

Concurrent rendering is perhaps the most significant addition, allowing React to prepare multiple versions of the UI simultaneously without blocking the main thread. In the React Native context, this means we can prioritize critical updates (like user input) while deferring less important updates (like data fetching):

```jsx
// Using startTransition to mark non-urgent updates
const [isPending, startTransition] = useTransition();

function handleSearch(query) {
  // Urgent: Update input value immediately
  setSearchQuery(query);
  
  // Non-urgent: Update search results in the background
  startTransition(() => {
    setSearchResults(filterItems(query));
  });
}
```

Suspense for data fetching, when fully implemented in React Native, will enable declarative loading states. Instead of managing loading states manually, we can wrap components in Suspense boundaries:

```jsx
function ProductScreen({ productId }) {
  return (
    <>
      <Header />
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetails productId={productId} />
      </Suspense>
      <Suspense fallback={<RelatedProductsSkeleton />}>
        <RelatedProducts productId={productId} />
      </Suspense>
    </>
  );
}
```

Automatic batching of state updates improves performance by combining multiple state updates into a single re-render. This is particularly valuable for React Native, where excessive re-renders can impact performance more severely than in web applications:

```jsx
function handleSubmit() {
  // In React 17, these would cause two renders
  // In React 18, these are automatically batched into one render
  setSubmitting(true);
  setFormErrors({});
}
```

I'm particularly excited about how these features will address some long-standing challenges in React Native development, especially around handling expensive re-renders and providing better loading experiences. The ability to prioritize UI updates based on user interaction will significantly improve perceived performance on mid-range devices."

### 5. Scaling Development Teams

"As React Native projects grow in size and complexity, deliberate strategies for scaling development teams become essential.

I've found monorepo strategies particularly effective for large React Native projects, especially when they include multiple platforms or companion apps. Using tools like Nx, Turborepo, or Yarn Workspaces provides a structured approach to code sharing and dependency management:

```
my-org/
├── apps/
│   ├── mobile/           # React Native app
│   ├── admin-dashboard/  # Web app
│   └── marketing-site/   # Next.js site
├── packages/
│   ├── ui/               # Shared UI components
│   ├── api-client/       # API interface
│   ├── validation/       # Form validation
│   └── analytics/        # Cross-platform analytics
```

For sharing code between web and mobile, I implement a layered architecture that separates platform-agnostic business logic from platform-specific UI:

```tsx
// Platform-agnostic hook
function useProductData(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchProduct(productId)
      .then(data => setProduct(data))
      .finally(() => setLoading(false));
  }, [productId]);
  
  return { product, loading };
}

// Platform-specific component
function ProductCard({ productId }: Props) {
  const { product, loading } = useProductData(productId);
  
  if (loading) {
    return Platform.OS === 'web' 
      ? <WebSkeleton /> 
      : <MobileSkeleton />;
  }
  
  // Platform-specific rendering
  return Platform.OS === 'web' 
    ? <WebProductCard product={product} /> 
    : <MobileProductCard product={product} />;
}
```

CI/CD optimization becomes crucial as teams grow. I implement:

1. Parallelized build processes for iOS and Android
2. Incremental builds that only rebuild affected modules
3. Caching strategies for node_modules and build artifacts
4. Automated testing divided into fast-running unit tests and slower integration tests

```yaml
# Example GitHub Actions workflow optimized for large teams
jobs:
  prepare:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      # Cache dependencies
      - uses: actions/cache@v3
        with:
          path: '**/node_modules'
          key: ${{ runner.os }}-modules-${{ hashFiles('**/yarn.lock') }}
      - run: yarn install --frozen-lockfile

  lint-and-test:
    needs: prepare
    runs-on: ubuntu-latest
    steps:
      # Run linting and unit tests in parallel
      - run: yarn lint
      - run: yarn test:unit
  
  build-android:
    needs: lint-and-test
    runs-on: ubuntu-latest
    steps:
      # Android specific build steps
  
  build-ios:
    needs: lint-and-test
    runs-on: macos-latest
    steps:
      # iOS specific build steps
```

For code quality at scale, I implement automated code reviews with tools like SonarQube integrated into the PR process, along with standardized PR templates and review checklists to ensure consistency.

These approaches have helped teams I've led scale from 5 to 30+ developers while maintaining code quality and release velocity."
