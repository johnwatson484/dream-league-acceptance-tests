@public
Feature: Cup competitions

  Scenario: View cup page
    When I navigate to the cup page
    Then I should see cup content

  Scenario: View league cup page
    When I navigate to the league cup page
    Then I should see cup content
