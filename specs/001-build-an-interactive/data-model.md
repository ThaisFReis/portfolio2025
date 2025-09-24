# Data Model

This document defines the data models for the Interactive AI Avatar Portfolio.

## ChatMessage

Represents a single message in the chat interface.

- **id**: `string` (unique identifier)
- **sender**: `"user" | "ai"`
- **content**: `string`
- **timestamp**: `Date`

## KnowledgeBase

A simple text file or string that contains the professional skills and experience of the portfolio owner. This will be used by the AI to answer questions.
