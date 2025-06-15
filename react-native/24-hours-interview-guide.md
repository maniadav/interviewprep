This study guide is designed to help you prepare for a React Native SDE-2 interview in 24 hours, focusing on the most critical concepts, common questions, real-world scenarios, optimizations, and advanced talking points. The content prioritizes topics frequently mentioned for mid-level React Native roles across the provided sources.

---

### React Native SDE-2 Interview Study Guide (24-Hour Review)

#### I. Top Critical React Native Concepts (40%)

Understanding these core concepts is fundamental for an SDE-2 role, demonstrating a solid grasp of React Native's capabilities and how it operates.

1.  **React Native vs. React: The Core Distinction**

    - **React** is a JavaScript library for building user interfaces, primarily for **web applications**, rendering to the Virtual DOM, which then updates the browser's DOM. It uses HTML and CSS for components and styling.
    - **React Native** is an open-source **framework** that extends React to **mobile app development** (iOS and Android). It uses **native components** (like `View`, `Text`, `Image`) instead of HTML tags, communicating with native APIs for rendering. The core idea is "Learn once, write anywhere", allowing a single codebase for multiple platforms.

2.  **Components: Building Blocks of UI**

    - Components are **reusable, self-contained pieces of UI** that manage their own state and props.
    - **Functional Components:** JavaScript functions that return React elements. Modern React Native prefers them, utilizing hooks for state and lifecycle.
    - **Class Components:** ES6 classes extending `React.Component`, offering built-in lifecycle methods. Less common in new development but important to understand.
    - **Core Components:** React Native provides essential components like `View` (basic UI building block), `Text` (display text), `Image` (render images), `TextInput` (user input), `ScrollView` (scrolling container), `FlatList` (efficient lists), and `TouchableOpacity` (touchable feedback).

3.  **Props vs. State: Data Flow and Mutability**

    - **Props (Properties):** Read-only data passed **from a parent component down to its child components**. They enable dynamic and reusable components by customizing them based on passed data. Props are **immutable** within the child component.
    - **State:** Mutable data that **belongs to a component** and can change over time, typically due to user interaction or network responses. Changes to state trigger re-renders of the component. State is managed **within the component**.

4.  **Hooks (useState, useEffect): Modern State and Side Effect Management**

    - Hooks allow functional components to "hook into" React features like state and lifecycle methods without writing a class.
    - **`useState`:** Allows functional components to manage **local state**.
      - Example: `const [count, setCount] = useState(0);`.
    - **`useEffect`:** Handles **side effects** (data fetching, subscriptions, manual DOM updates) in functional components. It runs after the initial render and on subsequent updates.
      - Example for data fetching: `useEffect(() => { /* fetch data */ }, []);`.

5.  **State Management Strategies (Redux, Context API):**

    - For **complex or large-scale applications**, managing state within components (local state) or via prop drilling becomes unmanageable.
    - **Redux:** A popular, predictable **state container** for managing **global application state** through a centralized store. It uses actions and reducers to ensure predictable state changes. Often used with middleware (e.g., Redux Thunk, Redux Saga) for asynchronous operations.
    - **Context API:** A simpler, built-in React feature for sharing data across components without explicit prop passing, suitable for **lighter state management** needs like themes or user preferences.

6.  **React Native Architecture and The Bridge:**

    - React Native's architecture is split into three main layers: the **JavaScript thread**, the **native code** (UI thread), and the **bridge** in between.
    - The **JavaScript thread** executes your React Native code, handling logic and state management.
    - The **Native UI thread** (main thread) is where native rendering occurs, including layout calculations and gesture handling.
    - The **Bridge** acts as a translator, serializing JSON messages and passing them asynchronously between the JS and native threads, allowing JavaScript to invoke native modules and vice versa. This asynchronous nature is key to smooth execution.

7.  **Flexbox: Responsive Layouts**
    - Flexbox is a layout model used to design **flexible and responsive layouts** in React Native. It helps structure the positioning of components to create a UI that adapts across different screen types and orientations.
    - Key properties include `flexDirection`, `justifyContent`, and `alignItems`.
    - **Differences from CSS Flexbox:** Default values for `flexDirection` (column in RN vs. row in CSS) and `flex` (0 in RN vs. 1 in CSS).

#### II. Most Common Interview Questions (30%)

These questions cover essential theoretical and practical knowledge expected from an SDE-2.

1.  **How do you create a new React Native project?**

    - **Answer:** You typically use either the **React Native CLI** or **Expo CLI**.
      - **React Native CLI:** `npx react-native init ProjectName`. This offers more control over native code.
      - **Expo CLI:** `npx create-expo-app ProjectName`. More beginner-friendly, abstracts native configurations, and provides built-in tools.
    - _Related Question:_ What are the differences between React Native CLI and Expo?

2.  **What is the purpose of `StyleSheet` in React Native?**

    - **Answer:** `StyleSheet.create()` is used to **create an abstraction layer for styling components**, similar to CSS but implemented in JavaScript. It helps **organize and reuse styles**, improves performance by reducing inline style overhead, and allows for **static analysis** and **optimization** by React Native.
      - Example: `const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#fff' } });`.
    - _Counter Question:_ What is the difference between `StyleSheet.create` and plain JavaScript objects for styling?

3.  **How do you handle user input in React Native?**

    - **Answer:** User input is handled using components like `TextInput` for text input fields and `Button` or `TouchableOpacity` for actions. The input state is typically managed using React Hooks like `useState`.
    - _Practical Question:_ Write a simple React Native component that displays a button and an alert when clicked.

      - ```javascript
        import React from "react";
        import { View, Button, Alert } from "react-native";

        const MyButton = () => {
          const handlePress = () => {
            Alert.alert("Button Pressed!");
          };

          return (
            <View>
              <Button title="Press Me" onPress={handlePress} />
            </View>
          );
        };
        export default MyButton;
        ```

4.  **How do you navigate between screens in a React Native application?**

    - **Answer:** Navigation is primarily implemented using **React Navigation**. This library provides various navigators such as **stack navigators** (for screen transitions), **tab navigators** (for bottom tabs), and **drawer navigators** (for side menus). You use the `navigate` function from the navigation prop to switch screens and can pass parameters between them.
    - _Related Question:_ How do you pass parameters between screens using React Navigation?

5.  **Explain the lifecycle methods of a React Native component.**

    - **Answer:** Components go through **mounting, updating, and unmounting** phases.
      - **Mounting:** `constructor()`, `render()`, `componentDidMount()`. `componentDidMount` is ideal for initial data fetching or subscriptions.
      - **Updating:** `static getDerivedStateFromProps()`, `shouldComponentUpdate()`, `render()`, `getSnapshotBeforeUpdate()`, `componentDidUpdate()`. `shouldComponentUpdate` and `componentDidUpdate` are key for performance optimization and reacting to prop/state changes.
      - **Unmounting:** `componentWillUnmount()`. Used for cleanup (e.g., clearing timers, removing listeners).

6.  **What is the significance of the `key` prop in lists in React Native?**

    - **Answer:** The `key` prop is **crucial for efficiently managing lists of elements**. When rendering a list, React uses the `key` prop to identify which items have changed, been added, or removed. This allows React to **optimize rendering by minimizing unnecessary updates** and ensures **stable identity** for each component in the list, preventing unexpected behavior or bugs when list items are reordered, added, or removed. Each key must be **unique** among its siblings.
    - _Practical Question:_ Write a program to create a simple list of items in React.

      - ````javascript
        import React from 'react';
        import { View, Text, FlatList } from 'react-native';

        const ItemList = () => {
          const items = [{ id: '1', name: 'Apple' }, { id: '2', name: 'Banana' }, { id: '3', name: 'Orange' }];
          return (
            <FlatList
              data={items}
              renderItem={({ item }) => <Text>{item.name}</Text>}
              keyExtractor={item => item.id}
            />
          );
        };
        export default ItemList;
        ``` (Adapted to use `FlatList` and unique `id` for `keyExtractor` as best practice).
        ````

7.  **How do you fetch and render a list of data using React Native?**
    - **Answer:** Data fetching typically involves using JavaScript's built-in **`fetch` API** or a library like **Axios**. You'd use the `useEffect` hook to initiate the fetch when the component mounts, and `useState` to store the fetched data. For rendering long lists, **`FlatList`** or **`SectionList`** are preferred over `ScrollView` for performance optimization, as they only render visible items.
      - _Practical Question:_ Write a functional component that fetches data from an API and displays it in a list. (See above example for `FlatList` and `useState` with explanation).

#### III. Real-World Scenarios/Challenges (15%)

SDE-2s are expected to handle common challenges. Be ready to discuss how you'd approach these.

1.  **Performance Issues (e.g., sluggish lists, animations, high CPU/memory usage):**

    - **Challenge:** Common bottlenecks include excessive re-renders, heavy computations on the main (JS) thread, large unoptimized images, inefficient list rendering (using `ScrollView` for large datasets), and poorly implemented animations. Memory leaks also contribute.
    - **Approach:**
      - **Diagnose:** Use **performance monitoring tools** like Flipper, React Native Debugger, or React DevTools. Monitor FPS, CPU, memory usage.
      - **Optimize:** Implement strategies like memoization (`React.memo`, `useMemo`, `useCallback`), use `FlatList` or `SectionList` for large lists with `getItemLayout` and `windowSize` props, optimize image loading (compression, resizing, caching with libraries like `react-native-fast-image`), offload heavy computations to native modules, and schedule expensive tasks with `InteractionManager`. For animations, use `useNativeDriver` and libraries like `React Native Reanimated`.

2.  **Native Module Integration / Platform-Specific Behavior:**

    - **Challenge:** Not all native functionalities are exposed through React Native, requiring custom native modules. Components might behave or look differently on iOS and Android. Integrating third-party native modules can be complex.
    - **Approach:** Use the **`Platform` module** for conditional rendering/styling. Create **platform-specific files** (e.g., `MyComponent.ios.js`, `MyComponent.android.js`). For functionalities not available in React Native, write **custom native modules** in Swift/Objective-C (iOS) or Java/Kotlin (Android) and expose them via the React Native Bridge using the `NativeModules` API.

3.  **Managing Large Datasets and Lists:**

    - **Challenge:** Rendering large lists with `ScrollView` causes performance issues as all data items are loaded into RAM at once. This can lead to slow scrolling and high memory usage. React Native has a known performance problem when `VirtualizedList` (used by `FlatList`) cannot render items quickly enough during a scroll, leading to blank spaces.
    - **Approach:** Always use **`FlatList` or `SectionList`** for large datasets. These components efficiently render only the visible items, drastically reducing memory usage. Optimize `FlatList` with `initialNumToRender`, `maxToRenderPerBatch`, `windowSize`, and `keyExtractor` props. Implement **pagination or infinite scrolling** to load data in chunks.

4.  **Handling Sensitive Data (e.g., API keys, user credentials):**
    - **Challenge:** `AsyncStorage` is unencrypted and local, making it unsuitable for sensitive data. Hardcoding API keys is insecure.
    - **Approach:** Use **secure storage solutions** like `React Native Keychain` (for iOS) or `Facebook Conceal` and `Android Keystore` (for Android). Always use **HTTPS/SSL/TLS** for network requests to encrypt data in transit. Avoid exposing sensitive information in debug logs. Utilize environment variables for API keys.

#### IV. Key Optimizations or Best Practices (10%)

Mentioning these demonstrates a strong understanding of performant React Native development.

1.  **Prevent Unnecessary Renders (Memoization):** Use `React.memo` for functional components and `PureComponent` for class components to prevent re-renders when props haven’t changed. Use `useMemo` for memoizing expensive calculations and `useCallback` for functions passed as props to child components.
2.  **Optimize List Performance:** Employ `FlatList` or `SectionList` for large datasets to efficiently render only visible items. Configure `initialNumToRender`, `maxToRenderPerBatch`, `windowSize`, and `keyExtractor`.
3.  **Image Optimization:** Resize images to the required dimensions, use efficient formats (PNG, WEBP), and use image caching tools like `react-native-fast-image`.
4.  **Reduce Bundle Size & Initial Load Time:** Implement **code splitting** and **lazy loading** for screens/components using `React.lazy` and `Suspense` to load only what's needed at startup.
5.  **Use Native Driver for Animations:** For smoother animations, utilize the `useNativeDriver: true` option in the Animated API to offload animations to the native thread. Consider `React Native Reanimated` for more control.
6.  **Dependency Management:** Regularly update dependencies to patch security vulnerabilities and ensure compatibility.
7.  **Testing Strategy:** Implement unit tests (Jest), integration tests (React Native Testing Library), and end-to-end tests (Detox, Appium) to ensure app reliability and quality. Integrate into CI/CD pipelines.
8.  **Accessibility:** Integrate accessibility APIs (`accessible`, `accessibilityLabel`) and test with screen readers to ensure inclusivity for all users.

#### V. Advanced Talking Points (5%)

These points can demonstrate a deeper understanding and forward-thinking perspective for an SDE-2.

1.  **React Native New Architecture (Fabric and Turbo Modules):**

    - **Insight:** Fabric modernizes the rendering layer, allowing specified priority tasks to be executed synchronously, improving UI rendering performance. Turbo Modules offer a more efficient native module system, aiming to replace the traditional bridge for better communication and performance. This shows an understanding of React Native's evolution beyond its traditional bridge.
    - _Related Question:_ What is the role of Fabric in React Native?

2.  **Comprehensive Performance Profiling Workflow:**

    - **Insight:** Beyond just knowing tools, an SDE-2 should articulate a systematic approach:
      - **Identify symptoms:** User reports, Q/A feedback, or general sluggishness.
      - **Initial monitoring:** Use general tools like React Native Performance Monitor or Xcode/Android Studio's overview to spot high-level issues.
      - **Deep dive:** For specific bottlenecks, use **Flipper** (with plugins like React DevTools Profiler, Hermes Profiler, `react-native-performance-monitor`) for detailed flame charts and trace data. Switch to native profilers (Xcode Instruments, Android Studio Profiler) when suspicion points to the native side (e.g., high CPU, memory leaks that aren't JS-related).
      - **Correlate metrics:** Understand that high CPU isn't always bad; correlate it with user actions and expected behavior.
      - **Test in release mode:** Development mode performance can be misleading; profile in release builds.
    - _Related Question:_ What tools would you use for performance profiling in React Native?

3.  **CodePush for Over-the-Air Updates:**
    - **Insight:** CodePush allows for **over-the-air (OTA) updates** of JavaScript code and assets directly to users' apps without requiring a full app store submission process. This is invaluable for rapid bug fixes and feature deployments. It demonstrates an understanding of deployment efficiency and continuous delivery.
    - _Related Question:_ What is CodePush and how can it be used in React Native apps?

---

Remember to practice articulating your answers clearly and concisely, using the STAR method for behavioral questions. Good luck!
