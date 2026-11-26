import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePendulumPeriod,
  calculateSpringPeriod,
  calculatePeriodFromCount,
  calculateFrequencyFromCount,
  calculateFrequencyFromPeriod,
  calculatePeriodFromFrequency,
  calculateWaveSpeed,
  calculateWaveSpeedFromPeriod,
  calculateWavelength,
  evaluateQuiz,
  computeLearningProgress,
  type QuizQuestion,
} from './formulas';

test('pendulum period increases with square root of string length', () => {
  const t1 = calculatePendulumPeriod(0.25, 9.8);
  const t2 = calculatePendulumPeriod(1.0, 9.8);
  assert.ok(Math.abs(t2 / t1 - 2) < 1e-9);
  assert.ok(Math.abs(t2 - 2.0070899) < 1e-4);
});

test('spring period increases when mass increases and decreases when k increases', () => {
  const tBase = calculateSpringPeriod(0.5, 50); // 2*pi*sqrt(0.01) = 0.2*pi
  assert.ok(Math.abs(tBase - 0.2 * Math.PI) < 1e-9);
  const tHeavy = calculateSpringPeriod(2.0, 50); // 2*pi*sqrt(0.04) = 0.4*pi
  assert.ok(Math.abs(tHeavy / tBase - 2) < 1e-9);
  const tStiff = calculateSpringPeriod(0.5, 200);
  assert.ok(tStiff < tBase);
});

test('period and frequency relationships (T = t/n, f = n/t, f = 1/T)', () => {
  const T = calculatePeriodFromCount(20, 40);
  const f = calculateFrequencyFromCount(40, 20);
  assert.equal(T, 0.5);
  assert.equal(f, 2);
  assert.equal(calculateFrequencyFromPeriod(T), 2);
  assert.equal(calculatePeriodFromFrequency(f), 0.5);
});

test('wave speed equations v = lambda * f and v = lambda / T are consistent', () => {
  const v1 = calculateWaveSpeed(2.5, 4);
  const v2 = calculateWaveSpeedFromPeriod(2.5, 0.25);
  assert.equal(v1, 10);
  assert.equal(v2, 10);
  assert.equal(calculateWavelength(10, 4), 2.5);
});

test('evaluateQuiz computes 10 points per question and returns recommendations', () => {
  const mockQuestions: QuizQuestion[] = [
    {
      id: 1,
      category: 'getaran',
      topicTag: 'Periode Getaran',
      question: 'Q1',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 1,
      calculationSteps: ['Step'],
      explanation: 'Exp',
      finalAnswerWithUnit: '2 s',
      narratorFeedback: 'Good',
    },
    {
      id: 2,
      category: 'getaran',
      topicTag: 'Frekuensi Getaran',
      question: 'Q2',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 2,
      calculationSteps: ['Step'],
      explanation: 'Exp',
      finalAnswerWithUnit: '5 Hz',
      narratorFeedback: 'Good',
    },
  ];

  const result = evaluateQuiz({ 1: 1, 2: 0 }, mockQuestions);
  assert.equal(result.score, 10);
  assert.equal(result.maxScore, 20);
  assert.equal(result.correctCount, 1);
  assert.equal(result.wrongCount, 1);
  assert.equal(result.percentage, 50);
  assert.deepEqual(result.recommendations, ['Frekuensi Getaran']);
});

import { GETARAN_QUIZ, GELOMBANG_QUIZ } from '../data/quizData';

test('computeLearningProgress reflects completed items accurately', () => {
  assert.equal(
    computeLearningProgress({
      completedTopics: [],
      completedLabs: [],
      getaranQuizScore: null,
      gelombangQuizScore: null,
      gameBestScore: 0,
    }),
    0
  );

  assert.equal(
    computeLearningProgress({
      completedTopics: Array.from({ length: 12 }, (_, i) => `t-${i}`),
      completedLabs: Array.from({ length: 6 }, (_, i) => `l-${i}`),
      getaranQuizScore: 100,
      gelombangQuizScore: 100,
      gameBestScore: 100,
    }),
    100
  );
});

test('quiz datasets have exactly 10 Getaran and 10 Gelombang questions with 4 options each', () => {
  assert.equal(GETARAN_QUIZ.length, 10);
  assert.equal(GELOMBANG_QUIZ.length, 10);

  for (const q of [...GETARAN_QUIZ, ...GELOMBANG_QUIZ]) {
    assert.equal(q.options.length, 4);
    assert.ok(q.correctIndex >= 0 && q.correctIndex <= 3);
    assert.ok(q.explanation.length > 10);
    assert.ok(q.finalAnswerWithUnit.length > 0);
  }

  const perfectAnswers: Record<number, number> = {};
  for (const q of GETARAN_QUIZ) {
    perfectAnswers[q.id] = q.correctIndex;
  }
  const result = evaluateQuiz(perfectAnswers, GETARAN_QUIZ);
  assert.equal(result.score, 100);
  assert.equal(result.percentage, 100);
});
