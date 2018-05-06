Sub multipleyearstocksheet()
    For Each ws In Worksheets
        Dim WorksheetName As String
        Dim TickerName As String
        Dim PrevTicker As String
        Dim TotalVolume As Double
            TotalVolume = 0
        Dim SumRow As Integer
            SumRow = 2
        Dim lastrow As Double
            WorksheetName = ws.Name
            lastrow = ws.Cells(Rows.Count, 1).End(xlUp).Row
            PrevTicker = ws.Cells(2, 1).Value
        For i = 2 To lastrow
            TickerName = ws.Cells(i, 1).Value
         Debug.Print (i)
            ws.Cells(1, 8).Value = "TickerName"
            ws.Cells(1, 9).Value = "TotalVolume"
            If TickerName = PrevTicker Then
                TotalVolume = TotalVolume + ws.Cells(i, 7).Value
            Else
                ws.Range("H1").Cells(SumRow, 1).Value = PrevTicker
                ws.Range("H1").Cells(SumRow, 2).Value = TotalVolume
             SumRow = SumRow + 1
             TotalVolume = ws.Cells(i, 7).Value
             PrevTicker = TickerName
            End If
                
        Next i
            ws.Range("H1").Cells(SumRow, 1).Value = TickerName
            ws.Range("H1").Cells(SumRow, 2).Value = TotalVolume
    Next ws
End Sub
