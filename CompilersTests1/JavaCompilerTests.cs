/*
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Compilers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LMSLibrary;

namespace Compilers.Tests
{
    [TestClass()]
    public class JavaCompilerTests
    {
        [TestMethod()]
        public void GetMessagesFromOutputTest()
        {
            ExecutionResult er = new ExecutionResult();
            er.Compiled = er.Succeeded = true;
            CloudCompiler compiler = CloudCompiler.GetCompiler("Java", "");

            //Test with output without error messages
            string output1 = "This is a string without error messages";
            string expected1 = "This is a string without error messages";
            er.Output = output1;
            er = compiler.GetMessagesFromOutput(er);

            Assert.AreEqual(expected1, er.Output);
            Assert.AreEqual(0, er.TestCodeMessages.Count);

            //Test with output without error messages but with passed tests
            string output2 = "\r\nThanks for using JUnit! Support its development at https://junit.org/sponsoring\r\n\r\n\u001b[36m.\u001b[0m\r\n\u001b[36m+--\u001b[0m \u001b" +
                "[36mJUnit Jupiter\u001b[0m \u001b[32m[OK]\u001b[0m\r\n\u001b[36m| " +
                "'--\u001b[0m \u001b[36mSumaTests\u001b[0m \u001b[32m[OK]\u001b[0m\r\n\u001b[36m|   " +
                "+--\u001b[0m \u001b[34mtest1(TestReporter)\u001b[0m \u001b[32m[OK]\u001b[0m\r\n\u001b[36m|   " +
                "|   \u001b[0m2021-09-28T17:16:43.264579800 \u001b[33mvalue\u001b" +
                "[0m = `\u001b[32m#S{Calculado con exito en 58 + 163}\u001b[0m`\r\n\u001b[36m|   " +
                "'--\u001b[0m \u001b[34mtest2(TestReporter)\u001b[0m \u001b[32m[OK]\u001b[0m\r\n\u001b[36m|       " +
                "\u001b[0m2021-09-28T17:16:43.337592300 \u001b[33mvalue\u001b[0m = `" +
                "\u001b[32m#S{Calculado con exito en 163 + 58}\u001b" +
                "[0m`\r\n\u001b[36m'--\u001b[0m \u001b[36mJUnit Vintage\u001b[0m \u001b[32m[OK]\u001b[0m\r\n\r\n" +
                "Test run finished after 480 ms\r\n[         " +
                "3 containers found      ]\r\n[         " +
                "0 containers skipped    ]\r\n[         " +
                "3 containers started    ]\r\n[        " +
                " 0 containers aborted    ]\r\n[         " +
                "3 containers successful ]\r\n[         " +
                "0 containers failed     ]\r\n[         " +
                "2 tests found           ]\r\n[         " +
                "0 tests skipped         ]\r\n[         " +
                "2 tests started         ]\r\n[         " +
                "0 tests aborted         ]\r\n[         " +
                "2 tests successful      ]\r\n[         " +
                "0 tests failed          ]\r\n\r\n";

            string expected2 = "\r\nThanks for using JUnit! Support its development at https://junit.org/sponsoring\r\n\r\n\u001b[36m.\u001b[0m\r\n\u001b[36m+--\u001b[0m \u001b" +
                "[36mJUnit Jupiter\u001b[0m \u001b[32m[OK]\u001b[0m\r\n\u001b[36m| " +
                "'--\u001b[0m \u001b[36mSumaTests\u001b[0m \u001b[32m[OK]\u001b[0m\r\n\u001b[36m|   " +
                "+--\u001b[0m \u001b[34mtest1(TestReporter)\u001b[0m \u001b[32m[OK]\u001b[0m\r\n\u001b[36m|   " +
                "|   \u001b[0m2021-09-28T17:16:43.264579800 \u001b[33mvalue\u001b" +
                "[0m = `\u001b[32mCalculado con exito en 58 + 163\u001b[0m`\r\n\u001b[36m|   " +
                "'--\u001b[0m \u001b[34mtest2(TestReporter)\u001b[0m \u001b[32m[OK]\u001b[0m\r\n\u001b[36m|       " +
                "\u001b[0m2021-09-28T17:16:43.337592300 \u001b[33mvalue\u001b[0m = `" +
                "\u001b[32mCalculado con exito en 163 + 58\u001b" +
                "[0m`\r\n\u001b[36m'--\u001b[0m \u001b[36mJUnit Vintage\u001b[0m \u001b[32m[OK]\u001b[0m\r\n\r\n" +
                "Test run finished after 480 ms\r\n[         " +
                "3 containers found      ]\r\n[         " +
                "0 containers skipped    ]\r\n[         " +
                "3 containers started    ]\r\n[        " +
                " 0 containers aborted    ]\r\n[         " +
                "3 containers successful ]\r\n[         " +
                "0 containers failed     ]\r\n[         " +
                "2 tests found           ]\r\n[         " +
                "0 tests skipped         ]\r\n[         " +
                "2 tests started         ]\r\n[         " +
                "0 tests aborted         ]\r\n[         " +
                "2 tests successful      ]\r\n[         " +
                "0 tests failed          ]\r\n\r\n";

            er = new ExecutionResult();
            er.Compiled = er.Succeeded = true;
            er.Output = output2;
            er = compiler.GetMessagesFromOutput(er);

            List<string> expected_messages2 = new List<string>();
            expected_messages2.Add("Calculado con exito en 58 + 163");
            expected_messages2.Add("Calculado con exito en 163 + 58");

            Assert.AreEqual(expected2, er.Output);
            CollectionAssert.AreEqual(expected_messages2, er.TestCodeMessages);

            //Test with output without passed tests
            string output3 = "\r\nThanks for using JUnit! Support its development " +
                "at https://junit.org/sponsoring\r\n\r\n\u001b[36m.\u001b[0m\r\n\u001b[36m+--\u001b[0m " +
                "\u001b[36mJUnit Jupiter\u001b[0m \u001b[32m[OK]\u001b[0m\r\n\u001b[36m| " +
                "'--\u001b[0m \u001b[36mSumaTests\u001b[0m \u001b[32m[OK]\u001b[0m\r\n\u001b[36m|   " +
                "+--\u001b[0m \u001b[31mtest1(TestReporter)\u001b[0m \u001b[31m[X]\u001b[0m " +
                "\u001b[31m#E{Error en 58 + 163} ==> expected: <221> but was: <222>\u001b[0m\r\n\u001b[36m|   " +
                "'--\u001b[0m \u001b[31mtest2(TestReporter)\u001b[0m \u001b[31m[X]\u001b[0m " +
                "\u001b[31m#E{Error en 163 + 58} ==> expected: <221> but was: <222>\u001b[0m\r\n\u001b" +
                "[36m'--\u001b[0m \u001b[36mJUnit Vintage\u001b[0m \u001b[32m[OK]\u001b[0m\r\n\r\n" +
                "Failures (2):\r\n  JUnit Jupiter:SumaTests:test1(TestReporter)\r\n    " +
                "MethodSource [className = 'SumaTests', methodName = 'test1', " +
                "methodParameterTypes = 'org.junit.jupiter.api.TestReporter']\r\n   " +
                " => org.opentest4j.AssertionFailedError: " +
                "#E{Error en 58 + 163} ==> expected: <221> but was: <222>\r\n       " +
                "org.junit.jupiter.api.AssertionUtils.fail(AssertionUtils.java:55)\r\n       " +
                "org.junit.jupiter.api.AssertionUtils.failNotEqual(AssertionUtils.java:62)\r\n       " +
                "org.junit.jupiter.api.AssertEquals.assertEquals(AssertEquals.java:150)\r\n       " +
                "org.junit.jupiter.api.Assertions.assertEquals(Assertions.java:543)\r\n       " +
                "SumaTests.test1(SumaTests.java:26)\r\n       " +
                "java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\r\n       " +
                "java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\r\n" +
                "       java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\r\n   " +
                "    java.base/java.lang.reflect.Method.invoke(Method.java:564)\r\n       " +
                "org.junit.platform.commons.util.ReflectionUtils.invokeMethod(ReflectionUtils.java:688)\r\n       " +
                "[...]\r\n  JUnit Jupiter:SumaTests:test2(TestReporter)\r\n    " +
                "MethodSource [className = 'SumaTests', methodName = 'test2', " +
                "methodParameterTypes = 'org.junit.jupiter.api.TestReporter']\r\n    " +
                "=> org.opentest4j.AssertionFailedError: #E{Error en 163 + 58} ==> expected: <221> but was: <222>\r\n" +
                "       org.junit.jupiter.api.AssertionUtils.fail(AssertionUtils.java:55)\r\n      " +
                " org.junit.jupiter.api.AssertionUtils.failNotEqual(AssertionUtils.java:62)\r\n     " +
                "  org.junit.jupiter.api.AssertEquals.assertEquals(AssertEquals.java:150)\r\n       " +
                "org.junit.jupiter.api.Assertions.assertEquals(Assertions.java:543)\r\n       " +
                "SumaTests.test2(SumaTests.java:34)\r\n       " +
                "java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\r\n       " +
                "java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\r\n" +
                "       java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\r\n       java.base/java.lang.reflect.Method.invoke(Method.java:564)\r\n       " +
                "org.junit.platform.commons.util.ReflectionUtils.invokeMethod(ReflectionUtils.java:688)\r\n       [...]\r\n\r\nTest run finished after 422 ms\r\n[         3 containers found      ]\r\n" +
                "[         0 containers skipped    ]\r\n[         3 containers started    ]\r\n[         0 containers aborted    ]\r\n[         3 containers successful ]\r\n[         0 containers failed     ]\r\n" +
                "[         2 tests found           ]\r\n[         0 tests skipped         ]\r\n[         2 tests started         ]\r\n[         0 tests aborted         ]\r\n[         0 tests successful      ]\r\n" +
                "[         2 tests failed          ]\r\n\r\n";

            string expected3 = "\r\nThanks for using JUnit! Support its development " +
                "at https://junit.org/sponsoring\r\n\r\n\u001b[36m.\u001b[0m\r\n\u001b[36m+--\u001b[0m " +
                "\u001b[36mJUnit Jupiter\u001b[0m \u001b[32m[OK]\u001b[0m\r\n\u001b[36m| " +
                "'--\u001b[0m \u001b[36mSumaTests\u001b[0m \u001b[32m[OK]\u001b[0m\r\n\u001b[36m|   " +
                "+--\u001b[0m \u001b[31mtest1(TestReporter)\u001b[0m \u001b[31m[X]\u001b[0m " +
                "\u001b[31mError en 58 + 163 ==> expected: <221> but was: <222>\u001b[0m\r\n\u001b[36m|   " +
                "'--\u001b[0m \u001b[31mtest2(TestReporter)\u001b[0m \u001b[31m[X]\u001b[0m " +
                "\u001b[31mError en 163 + 58 ==> expected: <221> but was: <222>\u001b[0m\r\n\u001b" +
                "[36m'--\u001b[0m \u001b[36mJUnit Vintage\u001b[0m \u001b[32m[OK]\u001b[0m\r\n\r\n" +
                "Failures (2):\r\n  JUnit Jupiter:SumaTests:test1(TestReporter)\r\n    " +
                "MethodSource [className = 'SumaTests', methodName = 'test1', " +
                "methodParameterTypes = 'org.junit.jupiter.api.TestReporter']\r\n   " +
                " => org.opentest4j.AssertionFailedError: " +
                "Error en 58 + 163 ==> expected: <221> but was: <222>\r\n       " +
                "org.junit.jupiter.api.AssertionUtils.fail(AssertionUtils.java:55)\r\n       " +
                "org.junit.jupiter.api.AssertionUtils.failNotEqual(AssertionUtils.java:62)\r\n       " +
                "org.junit.jupiter.api.AssertEquals.assertEquals(AssertEquals.java:150)\r\n       " +
                "org.junit.jupiter.api.Assertions.assertEquals(Assertions.java:543)\r\n       " +
                "SumaTests.test1(SumaTests.java:26)\r\n       " +
                "java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\r\n       " +
                "java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\r\n" +
                "       java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\r\n   " +
                "    java.base/java.lang.reflect.Method.invoke(Method.java:564)\r\n       " +
                "org.junit.platform.commons.util.ReflectionUtils.invokeMethod(ReflectionUtils.java:688)\r\n       " +
                "[...]\r\n  JUnit Jupiter:SumaTests:test2(TestReporter)\r\n    " +
                "MethodSource [className = 'SumaTests', methodName = 'test2', " +
                "methodParameterTypes = 'org.junit.jupiter.api.TestReporter']\r\n    " +
                "=> org.opentest4j.AssertionFailedError: Error en 163 + 58 ==> expected: <221> but was: <222>\r\n" +
                "       org.junit.jupiter.api.AssertionUtils.fail(AssertionUtils.java:55)\r\n      " +
                " org.junit.jupiter.api.AssertionUtils.failNotEqual(AssertionUtils.java:62)\r\n     " +
                "  org.junit.jupiter.api.AssertEquals.assertEquals(AssertEquals.java:150)\r\n       " +
                "org.junit.jupiter.api.Assertions.assertEquals(Assertions.java:543)\r\n       " +
                "SumaTests.test2(SumaTests.java:34)\r\n       " +
                "java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\r\n       " +
                "java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\r\n" +
                "       java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\r\n       java.base/java.lang.reflect.Method.invoke(Method.java:564)\r\n       " +
                "org.junit.platform.commons.util.ReflectionUtils.invokeMethod(ReflectionUtils.java:688)\r\n       [...]\r\n\r\nTest run finished after 422 ms\r\n[         3 containers found      ]\r\n" +
                "[         0 containers skipped    ]\r\n[         3 containers started    ]\r\n[         0 containers aborted    ]\r\n[         3 containers successful ]\r\n[         0 containers failed     ]\r\n" +
                "[         2 tests found           ]\r\n[         0 tests skipped         ]\r\n[         2 tests started         ]\r\n[         0 tests aborted         ]\r\n[         0 tests successful      ]\r\n" +
                "[         2 tests failed          ]\r\n\r\n";

            er = new ExecutionResult();
            er.Compiled = er.Succeeded = true;
            er.Output = output3;
            er = compiler.GetMessagesFromOutput(er);

            List<string> expected_messages3 = new List<string>();
            expected_messages3.Add("Error en 58 + 163");
            expected_messages3.Add("Error en 163 + 58");
            
            Assert.AreEqual(expected3, er.Output);
            CollectionAssert.AreEqual(expected_messages3, er.TestCodeMessages);
        }
    }
}
*/