@public
Feature: Goals listing

  Scenario: View goals page
    When I navigate to the goals page
    Then I should see a list of goals
