```mermaid
classDiagram

<!-- User -->
User --* UserTestRole
Role --* UserTestRole

<!-- Test -->
Test --* UserTestRole
Test --* Section
Section --* FacetSection
Section --* Item

<!-- Facets -->
Test --* Facet
Facet --* Band
Facet --* Facet
Band --* BandLevel
Facet --* FacetSection

<!-- Items -->
FacetSection --* Item

class User {
  User ID
  Username
  Password
  Email
  Role
  IsActive
}

class Role {
  Role ID
  Name
  Permissions
}

class UserTestRole {
  Role ID
  User ID
  Test ID
}

class UserTest {
  User ID
  Test ID
}

class Test {
  Test ID
  Name
  Dimension
  Code
  Test Developers
  Test Type
  Status
  MaxFacetDepth
}

class Facet {
  Facet ID
  Test ID
  Name
  Code
  <!-- Parent Facet ID -->
  Description
  Path (ltree)
}

class Band {
  Band ID
  Facet ID
  Metric
  BandLevelID
}

class BandLevel {
  BandLevel ID
  Band ID
  Name
  Code
  Description
  Lower bound
  Upper bound
  Interpretation
  Title
  Description
}

class Section {
  Section ID
  Test ID
  Name
  Code
  Order
  Time Limit
  Instructions
}

class FacetSection {
  FacetSection ID
  Facet ID
  Section ID
}

class Item {
  Item ID
  FacetSection ID
  Order
  Code
  Stimulus
  Response Type
  Responses
  Rating
  Scoring
}
```
