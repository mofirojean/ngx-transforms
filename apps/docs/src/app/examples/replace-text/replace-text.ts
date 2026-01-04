import {Component, signal, ViewEncapsulation} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HlmInputImports} from '@spartan-ng/helm/input';
import {HlmScrollAreaImports} from '@spartan-ng/helm/scroll-area';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {HlmButtonImports} from '@spartan-ng/helm/button';
import {ReplacePipe} from '@ngx-transforms';

const longText = `
  In the heart of modern web development, JavaScript remains the cornerstone, providing the dynamic capabilities that users have come to expect. Frameworks build upon this foundation, and Angular stands out as a comprehensive platform for building sophisticated single-page applications. Understanding Angular involves grasping concepts like components, modules, services, and data binding. The component architecture, in particular, promotes reusability and maintainability, allowing developers to build complex UIs from smaller, isolated pieces. Each component encapsulates its own template, styles, and logic, making the development process more organized.

  The learning curve for Angular can be steep, especially for those new to TypeScript or reactive programming with RxJS, which Angular uses extensively for handling asynchronous operations and managing data streams. However, the investment in learning Angular pays off in the scalability and structure it brings to large applications. Data flow management is critical, and services are typically used to share data and logic across different components, promoting separation of concerns. Whether fetching data from an API or managing application state, services play a vital role. Sometimes, transforming data for display requires custom logic, and this is where Angular pipes come in handy. A custom pipe, like the highlight pipe we discussed, can encapsulate transformation logic cleanly.

  Here in Bambili, the pursuit of education often intersects with the adoption of new technology. Students and developers learning web development might explore frameworks like Angular or React. The choice often depends on project requirements and team familiarity. Building a robust application involves careful planning of the architecture, including how components interact and how data is managed. Effective state management solutions, such as NgRx or NGXS, become important as the application grows in complexity, ensuring predictable data updates across the entire application. The development lifecycle includes writing code, testing components and services, and building the application for production. Modern JavaScript tooling helps streamline this process.

  Let's consider the practical application of these concepts. Imagine building an educational platform. You'd have components for courses, user profiles, assignments, and perhaps a dashboard. Data about courses (titles, descriptions, instructors) would likely come from a backend API. An Angular service would handle fetching this data. Inside a course list component, you might use an '*ngFor' directive to loop through the course data and display each course. If you implement a search feature for courses, you'd need to filter the data based on the user's input. Displaying the search results could involve using the 'highlight' pipe to emphasize the search term within the course titles or descriptions. This enhances the user experience by making relevant information stand out. The development of such features requires a solid understanding of both Angular fundamentals and JavaScript itself.

  Furthermore, the concept of pipes extends beyond simple text transformation. Angular provides built-in pipes for common tasks like formatting dates (DatePipe), numbers (DecimalPipe, CurrencyPipe), and handling asynchronous data in templates (AsyncPipe). Creating a custom pipe, like the highlight pipe, allows developers to tailor data transformation to specific application needs. For instance, you might create a pipe to sort data, filter data based on complex criteria, or integrate with internationalization libraries. Effective use of pipes keeps component templates clean and readable, separating display logic from component logic. The template literal feature in JavaScript itself is a powerful tool for creating strings, especially multi-line strings or strings with embedded expressions, which is often useful within component templates or logic.

  The technology landscape is ever-evolving. New versions of JavaScript (ECMAScript) introduce features that enhance the language, while frameworks like Angular continuously update to provide better performance, improved developer experience, and new capabilities. Staying current requires ongoing learning and adaptation. The community around Angular is vast, offering resources, libraries, and support for developers facing challenges. Whether you are working on a small project or a large enterprise-level application, the principles of good software development – modularity, testability, maintainability – remain paramount. Angular, with its opinionated structure, encourages adherence to these principles. The development community in places like Bambili contributes to and benefits from this global exchange of knowledge in technology and education. Learning JavaScript and Angular here opens doors to numerous opportunities. Remember the highlight pipe example? It's a small piece, but it demonstrates how specific features address common UI requirements in web application development. Data visualization is another area where JavaScript libraries integrate with Angular components to present complex data effectively. The journey of learning never truly ends in software development. This entire block of text was generated using a JavaScript template literal.
`;

@Component({
  selector: 'app-replace-text',
  standalone: true,
  imports: [
    HlmInputImports,
    HlmScrollAreaImports,
    NgScrollbarModule,
    FormsModule,
    HlmButtonImports,
    ReplacePipe
  ],
  templateUrl: './replace-text.html',
  styles: [
    `
      .rp-highlight {
        background-color: yellow;
        color: black;
        border-radius: 5px;
        padding: 0 1px;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  providers: []
})
export class ReplaceText {
  protected longTextContent: string = longText;
  findText = signal<string>('');
  replace = signal<string>('');
  isReplace = signal<boolean>(false);

  replaceText() {
    this.isReplace.set(true);

    const pattern = new RegExp(this.findText(), 'gi');
    this.longTextContent = this.longTextContent.replace(pattern, this.replace());
  }
}
