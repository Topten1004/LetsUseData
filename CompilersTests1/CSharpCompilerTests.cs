/*
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Compilers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using LMSLibrary;

namespace Compilers.Tests
{
    [TestClass()]
    public class CSharpCompilerTests
    {
        [TestMethod()]
        public void GetMessagesFromOutputTest()
        {
            ExecutionResult er = new ExecutionResult();
            er.Compiled = er.Succeeded = true;
            CloudCompiler compiler = CloudCompiler.GetCompiler("C#", "");

            //Test with output without error messages
            string output1 = "This is a string without error messages";
            string expected1 = "This is a string without error messages";
            er.Output = output1;
            er = compiler.GetMessagesFromOutput(er);

            Assert.AreEqual(expected1, er.Output);
            Assert.AreEqual(0, er.TestCodeMessages.Count);

            //Test with output without error messages but with passed tests
            string output2 = "1 archivos de prueba en total coincidieron con el patrón especificado.\r\n " +
                "Correctas TestMethod2[15 ms]\r\n " +
                "Correctas TestMethod1[3 ms]\r\n\r\n" +
                "La serie de pruebas se ejecutó correctamente.\r\n" +
                "Pruebas totales: 2\r\n Correcto: 2\r\n Tiempo total: 1,1242 Segundos\r\n";
            
            string expected2 = "1 archivos de prueba en total coincidieron con el patrón especificado.\r\n " +
                "Correctas TestMethod2[15 ms]\r\n " +
                "Correctas TestMethod1[3 ms]\r\n\r\n" +
                "La serie de pruebas se ejecutó correctamente.\r\n" +
                "Pruebas totales: 2\r\n Correcto: 2\r\n Tiempo total: 1,1242 Segundos\r\n";

            er = new ExecutionResult();
            er.Compiled = er.Succeeded = true;
            er.Output = output2;
            er = compiler.GetMessagesFromOutput(er);

            List<string> expected_messages2 = new List<string>();
            expected_messages2.Add("Correctas TestMethod2");
            expected_messages2.Add("Correctas TestMethod1");

            Assert.AreEqual(expected2, er.Output);            
            CollectionAssert.AreEqual(expected_messages2, er.TestCodeMessages);

            //Test with output without passed tests
            string output3 = "1 archivos de prueba en total coincidieron con el patrón especificado.\r\n  " +
                "Con error TestMethod1 [42 ms]\r\n  " +
                "Mensaje de error:\r\n   Assert.AreEqual failed. Expected:<670>. Actual:<671>. " +
                "#E{Test1: Error al realizar 616 + 54}\r\n  " +
                "Seguimiento de la pila:\r\n     en Test.TestMethod1()\r\n\r\n  " +
                "Con error TestMethod2 [2 ms]\r\n  " +
                "Mensaje de error:\r\n   Assert.AreEqual failed. Expected:<670>. Actual:<671>. " +
                "#E{Test2: error al realizar 54 + 616}\r\n  Seguimiento de la pila:\r\n     en Test.TestMethod2()\r\n\r\n\r\n" +
                "Pruebas totales: 2\r\n     Incorrecto: 2\r\n Tiempo total: 1,0990 Segundos\r\n";
            
            string expected3 = "1 archivos de prueba en total coincidieron con el patrón especificado.\r\n  " +
                "Con error TestMethod1 [42 ms]\r\n  " +
                "Mensaje de error:\r\n   Assert.AreEqual failed. Expected:<670>. Actual:<671>. " +
                "Test1: Error al realizar 616 + 54\r\n  " +
                "Seguimiento de la pila:\r\n     en Test.TestMethod1()\r\n\r\n  " +
                "Con error TestMethod2 [2 ms]\r\n  " +
                "Mensaje de error:\r\n   Assert.AreEqual failed. Expected:<670>. Actual:<671>. " +
                "Test2: error al realizar 54 + 616\r\n  Seguimiento de la pila:\r\n     en Test.TestMethod2()\r\n\r\n\r\n" +
                "Pruebas totales: 2\r\n     Incorrecto: 2\r\n Tiempo total: 1,0990 Segundos\r\n";

            er = new ExecutionResult();
            er.Compiled = er.Succeeded = true;
            er.Output = output3;
            er = compiler.GetMessagesFromOutput(er);

            List<string> expected_messages3 = new List<string>();
            expected_messages3.Add("Test1: Error al realizar 616 + 54");
            expected_messages3.Add("Test2: error al realizar 54 + 616");
            Assert.AreEqual(expected3, er.Output);
            CollectionAssert.AreEqual(expected_messages3, er.TestCodeMessages);

            string output4 = "1 archivos de prueba en total coincidieron con el patrón especificado.\r\n  " +
                "Correctas TestMethod1 [19 ms]\r\n  Con error TestMethod2 [51 ms]\r\n  Mensaje de error:\r\n   " +
                "Assert.Fail failed. #E{Este test siempre falla}\r\n  " +
                "Seguimiento de la pila:\r\n     en Test.TestMethod2()\r\n\r\n  " +
                "Correctas TestMethod3 [< 1 ms]\r\n\r\n" +
                "Pruebas totales: 3\r\n     Correcto: 2\r\n     Incorrecto: 1\r\n Tiempo total: 1,6890 Segundos\r\n";

            string expected4 = "1 archivos de prueba en total coincidieron con el patrón especificado.\r\n  " +
                "Correctas TestMethod1 [19 ms]\r\n  Con error TestMethod2 [51 ms]\r\n  Mensaje de error:\r\n   " +
                "Assert.Fail failed. Este test siempre falla\r\n  " +
                "Seguimiento de la pila:\r\n     en Test.TestMethod2()\r\n\r\n  " +
                "Correctas TestMethod3 [< 1 ms]\r\n\r\n" +
                "Pruebas totales: 3\r\n     Correcto: 2\r\n     Incorrecto: 1\r\n Tiempo total: 1,6890 Segundos\r\n";

            er = new ExecutionResult();
            er.Compiled = er.Succeeded = true;
            er.Output = output4;
            er = compiler.GetMessagesFromOutput(er);

            List<string> expected_messages4 = new List<string>();
            expected_messages4.Add("Correctas TestMethod1");
            expected_messages4.Add("Este test siempre falla");
            expected_messages4.Add("Correctas TestMethod3");
            
            Assert.AreEqual(expected4, er.Output);
            CollectionAssert.AreEqual(expected_messages4, er.TestCodeMessages);
        }
    }
}
*/